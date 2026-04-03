import { useState, useEffect } from 'react';
import { Shield, Check, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { OrderSummary } from './OrderSummary';
import { CheckoutForm } from './CheckoutForm';
import { getProducts, createCheckout } from '../../lib/shopifyClient';

interface CheckoutProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  variantId?: string;
}

interface CheckoutState {
  discountCode: string;
  discountApplied: boolean;
  discountAmount: number;
  termsAccepted: boolean;
  isProcessing: boolean;
  shippingMethod: 'standard' | 'express' | 'overnight';
  addBowl: boolean;
  addDrinker: boolean;
  addSupplement: boolean;
  addToy: boolean;
  selectedVariantId?: string;
  selectedSize?: string;
}

const SHIPPING_COSTS = {
  standard: 0,
  express: 12.99,
  overnight: 24.99,
};

const ADDON_PRICES = {
  bowl: 24.99,
  drinker: 19.99,
  supplement: 34.99,
  toy: 0,
};

// Fallback product in case Shopify fetch fails
const FALLBACK_PRODUCTS: CheckoutProduct[] = [
  {
    id: '1',
    name: 'Premium Raw Dog Food - Chicken',
    price: 49.99,
    quantity: 1,
    size: '10 lb',
    variantId: 'fallback-variant-10lb',
    image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23FF7A59%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2216%22 fill=%22white%22 text-anchor=%22middle%22 dy=%22.3em%22%3EDog Food%3C/text%3E%3C/svg%3E',
  },
];

interface CheckoutProps {
  onOrderComplete?: () => void;
}

export function Checkout({ onOrderComplete }: CheckoutProps) {
  const [products, setProducts] = useState<CheckoutProduct[]>(FALLBACK_PRODUCTS);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState<string | null>(null);

  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    discountCode: '',
    discountApplied: false,
    discountAmount: 0,
    termsAccepted: false,
    isProcessing: false,
    shippingMethod: 'standard',
    addBowl: false,
    addDrinker: false,
    addSupplement: false,
    addToy: false,
    selectedVariantId: undefined,
    selectedSize: undefined,
  });

  // Fetch products from Shopify on mount
  useEffect(() => {
    const fetchShopifyProducts = async () => {
      try {
        setLoadingProducts(true);
        const shopifyProducts = await getProducts();
        
        // Convert Shopify products to CheckoutProduct format
        const convertedProducts: CheckoutProduct[] = shopifyProducts.flatMap(product => {
          return product.variants.map((variant) => ({
            id: product.id,
            name: product.title,
            price: parseFloat(variant.price.amount),
            quantity: 1,
            size: variant.title,
            variantId: variant.id,
            image: variant.image?.url || product.image?.url || undefined,
          }));
        });

        if (convertedProducts.length > 0) {
          setProducts(convertedProducts);
          // Pre-select first variant
          const firstProduct = convertedProducts[0]!;
          setCheckoutState(prev => ({
            ...prev,
            selectedVariantId: firstProduct.variantId,
            selectedSize: firstProduct.size,
          }));
        } else {
          setProductError('No products available');
          setProducts(FALLBACK_PRODUCTS);
        }
      } catch (error) {
        console.error('Failed to fetch Shopify products:', error);
        setProductError('Using fallback product. Check Shopify API configuration.');
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchShopifyProducts();
  }, []);

  const subtotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const addOnsPrice = 
    (checkoutState.addBowl ? ADDON_PRICES.bowl : 0) + 
    (checkoutState.addDrinker ? ADDON_PRICES.drinker : 0) +
    (checkoutState.addSupplement ? ADDON_PRICES.supplement : 0) +
    (checkoutState.addToy ? ADDON_PRICES.toy : 0);
  const shippingCost = SHIPPING_COSTS[checkoutState.shippingMethod];
  const total = subtotal + addOnsPrice + shippingCost - checkoutState.discountAmount;

  const handleApplyDiscount = () => {
    // Simple discount code validation
    const validCodes: Record<string, number> = {
      SAVE10: subtotal * 0.1,
      SAVE20: subtotal * 0.2,
      FIRST: subtotal * 0.15,
    };

    const discountAmount = validCodes[checkoutState.discountCode.toUpperCase()];
    if (discountAmount) {
      setCheckoutState(prev => ({
        ...prev,
        discountApplied: true,
        discountAmount: discountAmount,
      }));
    } else {
      setCheckoutState(prev => ({
        ...prev,
        discountApplied: false,
        discountAmount: 0,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkoutState.termsAccepted) {
      alert('Please accept the terms and conditions');
      return;
    }

    if (!checkoutState.selectedVariantId) {
      alert('Please select a product variant');
      return;
    }

    setCheckoutState(prev => ({ ...prev, isProcessing: true }));
    
    try {
      // Create Shopify checkout with selected variant
      const lineItems = [
        {
          variantId: checkoutState.selectedVariantId,
          quantity: 1,
        },
      ];

      const checkout = await createCheckout(lineItems);
      
      // Redirect to Shopify checkout
      if (checkout.webUrl) {
        window.location.href = checkout.webUrl;
      } else {
        throw new Error('No checkout URL returned from Shopify');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(`Checkout error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setCheckoutState(prev => ({ ...prev, isProcessing: false }));
    }
  };

  // Calculate current step
  const currentStep = !checkoutState.selectedVariantId ? 0 : 1;

  return (
    <main className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Progress Bar */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Checkout</h1>
            <div className="text-sm text-gray-600">Step <span className="font-bold">1</span> of <span className="font-bold">3</span></div>
          </div>
          {/* Progress indicator */}
          <div className="flex gap-2">
            <div className="flex-1 h-2 bg-[#FF7A59] rounded-full"></div>
            <div className={`flex-1 h-2 rounded-full transition-colors ${currentStep >= 1 ? 'bg-[#FF7A59]' : 'bg-gray-300'}`}></div>
            <div className={`flex-1 h-2 rounded-full transition-colors ${currentStep >= 2 ? 'bg-[#FF7A59]' : 'bg-gray-300'}`}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Select Product */}
              {loadingProducts ? (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
                  <p className="text-blue-900 font-medium">Loading products...</p>
                </div>
              ) : (
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#FF7A59] transition-colors">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF7A59] text-white font-bold">1</span>
                    Choose Your Size
                  </h2>
                  
                  <div className="space-y-3">
                    {products.map(product => (
                      <label 
                        key={product.variantId || product.id}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          checkoutState.selectedVariantId === product.variantId
                            ? 'border-[#FF7A59] bg-orange-50'
                            : 'border-gray-200 bg-white hover:border-[#FF7A59]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="product"
                          value={product.variantId || product.id}
                          checked={checkoutState.selectedVariantId === product.variantId}
                          onChange={(e) => {
                            const selected = products.find(p => (p.variantId || p.id) === e.target.value);
                            if (selected) {
                              setCheckoutState(prev => ({
                                ...prev,
                                selectedSize: selected.size,
                                selectedVariantId: selected.variantId,
                              }));
                            }
                          }}
                          className="w-5 h-5 cursor-pointer"
                        />
                        <div className="ml-4 flex-1">
                          <div className="font-semibold text-gray-900">{product.size}</div>
                          <p className="text-sm text-gray-600">{product.name}</p>
                        </div>
                        <div className="text-xl font-bold text-[#FF7A59]">${product.price.toFixed(2)}</div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Details */}
              <div className={`bg-white border-2 rounded-xl p-6 transition-all ${
                currentStep >= 1 ? 'border-gray-200 opacity-100' : 'border-gray-200 opacity-50 pointer-events-none'
              }`}>
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF7A59] text-white font-bold">2</span>
                  Where To Ship?
                </h2>
                
                <CheckoutForm formType="shipping" />

                {/* Shipping Method */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Delivery Speed</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'standard', name: 'Standard', time: '5-7 days', cost: 0 },
                      { id: 'express', name: 'Express', time: '2-3 days', cost: 12.99 },
                      { id: 'overnight', name: 'Overnight', time: '1 day', cost: 24.99 },
                    ].map(method => (
                      <label 
                        key={method.id}
                        className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          checkoutState.shippingMethod === method.id
                            ? 'border-[#FF7A59] bg-orange-50'
                            : 'border-gray-200 bg-white hover:border-[#FF7A59]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          checked={checkoutState.shippingMethod === method.id}
                          onChange={(e) => setCheckoutState(prev => ({ ...prev, shippingMethod: e.target.value as any }))}
                          className="w-5 h-5"
                        />
                        <div className="ml-3 flex-1">
                          <div className="font-semibold text-sm text-gray-900">{method.name}</div>
                          <div className="text-xs text-gray-500">{method.time}</div>
                        </div>
                        <div className="font-semibold text-gray-900">
                          {method.cost === 0 ? 'FREE' : `+$${method.cost.toFixed(2)}`}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Finalize Order */}
              <div className={`bg-white border-2 rounded-xl p-6 transition-all ${
                currentStep >= 2 ? 'border-gray-200 opacity-100' : 'border-gray-200 opacity-50 pointer-events-none'
              }`}>
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF7A59] text-white font-bold">3</span>
                  Review & Complete
                </h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">Have a promo code?</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="SAVE10, SAVE20, FIRST..."
                      value={checkoutState.discountCode}
                      onChange={(e) => setCheckoutState(prev => ({ ...prev, discountCode: e.target.value }))}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleApplyDiscount}
                      variant="outline"
                      className="px-6"
                    >
                      Apply
                    </Button>
                  </div>
                  {checkoutState.discountApplied && (
                    <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 flex items-center gap-2">
                      <Check className="w-4 h-4 flex-shrink-0" />
                      You save ${checkoutState.discountAmount.toFixed(2)}!
                    </div>
                  )}
                </div>

                {/* Terms */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <Checkbox 
                      checked={checkoutState.termsAccepted}
                      onCheckedChange={(checked: boolean | 'indeterminate') => setCheckoutState(prev => ({ ...prev, termsAccepted: checked === true }))}
                      className="mt-1"
                    />
                    <div className="flex-1 text-sm">
                      <p className="text-gray-700">
                        Yes, I agree to the <a href="#" className="text-[#FF7A59] font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-[#FF7A59] font-semibold hover:underline">Privacy Policy</a>
                      </p>
                    </div>
                  </label>
                </div>

                {/* CTA Button */}
                <button
                  type="submit"
                  disabled={checkoutState.isProcessing || !checkoutState.termsAccepted || !checkoutState.selectedVariantId}
                  className="w-full bg-[#FF7A59] hover:bg-[#ff6844] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-lg"
                >
                  {checkoutState.isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Complete Purchase - ${total.toFixed(2)}
                    </>
                  )}
                </button>

                {/* Security Badge */}
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
                  <Shield className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-900">
                    <strong>100% Secure:</strong> Your payment goes directly to Shopify. We never see your card info.
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column - Order Summary Sidebar */}
          <div className="lg:sticky lg:top-[200px]">
            {/* Order Summary Card */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-bold">Order Summary</h3>
              
              {/* Product */}
              {checkoutState.selectedSize && (
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600">Selected Size</p>
                  <p className="font-semibold text-gray-900">{checkoutState.selectedSize}</p>
                  <p className="text-sm text-[#FF7A59] font-bold mt-1">
                    ${products.find(p => p.variantId === checkoutState.selectedVariantId)?.price.toFixed(2) || '0.00'}
                  </p>
                </div>
              )}

              {/* Add-ons List */}
              {(checkoutState.addBowl || checkoutState.addDrinker || checkoutState.addSupplement || checkoutState.addToy) && (
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Add-ons</p>
                  {checkoutState.addBowl && <div className="flex justify-between text-sm mb-1"><span>Premium Bowl</span><span>$24.99</span></div>}
                  {checkoutState.addDrinker && <div className="flex justify-between text-sm mb-1"><span>Water Drinker</span><span>$19.99</span></div>}
                  {checkoutState.addSupplement && <div className="flex justify-between text-sm mb-1"><span>Joint Supplement</span><span>$34.99</span></div>}
                  {checkoutState.addToy && <div className="flex justify-between text-sm mb-1"><span>Durable Toy</span><span>FREE</span></div>}
                </div>
              )}

              {/* Pricing Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {addOnsPrice > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span>Add-ons</span>
                    <span>+${addOnsPrice.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `+$${shippingCost.toFixed(2)}`}</span>
                </div>
                {checkoutState.discountAmount > 0 && (
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span>Discount</span>
                    <span>-${checkoutState.discountAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="pt-4 border-t-2 border-gray-200">
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-700">Total</span>
                  <span className="text-3xl font-bold text-[#FF7A59]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Info Cards */}
              <div className="pt-4 space-y-3 border-t border-gray-200">
                <div className="p-3 bg-green-50 rounded-lg flex gap-2">
                  <Check className="w-4 h-4 text-green-700 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-green-900"><strong>Free returns</strong> within 30 days</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg flex gap-2">
                  <Lock className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-900"><strong>100% secure</strong> Shopify checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
