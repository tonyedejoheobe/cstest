import { useState } from 'react';
import { Shield, Check, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { OrderSummary } from './OrderSummary';
import { CheckoutForm } from './CheckoutForm';

interface CheckoutProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
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

const SAMPLE_PRODUCTS: CheckoutProduct[] = [
  {
    id: '1',
    name: 'Premium Raw Dog Food - Chicken',
    price: 49.99,
    quantity: 1,
    size: '10 lb',
    image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23FF7A59%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2216%22 fill=%22white%22 text-anchor=%22middle%22 dy=%22.3em%22%3EDog Food%3C/text%3E%3C/svg%3E',
  },
];

interface CheckoutProps {
  onOrderComplete?: () => void;
}

export function Checkout({ onOrderComplete }: CheckoutProps) {
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
  });

  const subtotal = SAMPLE_PRODUCTS.reduce((sum, product) => sum + product.price * product.quantity, 0);
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

    if (validCodes[checkoutState.discountCode.toUpperCase()]) {
      setCheckoutState(prev => ({
        ...prev,
        discountApplied: true,
        discountAmount: validCodes[checkoutState.discountCode.toUpperCase()],
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

    setCheckoutState(prev => ({ ...prev, isProcessing: true }));
    
    // Simulate payment processing
    setTimeout(() => {
      setCheckoutState(prev => ({ ...prev, isProcessing: false }));
      if (onOrderComplete) {
        onOrderComplete();
      } else {
        alert('Order placed successfully! (Demo - No actual charge)');
      }
    }, 2000);
  };

  return (
    <main className="bg-white">
      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Address */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF7A59] text-white text-sm font-semibold">1</span>
                  Shipping Address
                </h2>
                <CheckoutForm formType="shipping" />
              </div>

              {/* Billing Address */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF7A59] text-white text-sm font-semibold">2</span>
                  Billing Address
                </h2>
                <div className="mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox defaultChecked />
                    <span className="text-sm text-gray-600">Same as shipping address</span>
                  </label>
                </div>
                <details className="cursor-pointer">
                  <summary className="text-sm font-semibold text-gray-700 cursor-pointer mb-4">Different billing address</summary>
                  <CheckoutForm formType="billing" />
                </details>
              </div>

              {/* Shipping Method */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF7A59] text-white text-sm font-semibold">3</span>
                  Shipping Method
                </h2>
                <div className="space-y-3">
                  {[
                    { id: 'standard', name: 'Standard Shipping', time: '5-7 business days', cost: 0 },
                    { id: 'express', name: 'Express Shipping', time: '2-3 business days', cost: 12.99 },
                    { id: 'overnight', name: 'Overnight Shipping', time: '1 business day', cost: 24.99 },
                  ].map(method => (
                    <label key={method.id} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                      <input
                        type="radio"
                        name="shipping"
                        value={method.id}
                        checked={checkoutState.shippingMethod === method.id}
                        onChange={(e) => setCheckoutState(prev => ({ ...prev, shippingMethod: e.target.value as any }))}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-900">{method.name}</div>
                        <div className="text-xs text-gray-500">{method.time}</div>
                      </div>
                      <div className="font-semibold text-sm text-gray-900">
                        {method.cost === 0 ? 'FREE' : `$${method.cost.toFixed(2)}`}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF7A59] text-white text-sm font-semibold">4</span>
                  Payment Method
                </h2>
                
                <div className="space-y-4">
                  {/* Credit Card Option */}
                  <label className="flex items-start p-4 border-2 border-[#FF7A59] rounded-lg cursor-pointer bg-orange-50">
                    <input type="radio" name="payment" defaultChecked className="mt-1 mr-3" />
                    <div className="flex-1">
                      <div className="font-semibold text-sm mb-3">Credit or Debit Card</div>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs font-semibold mb-1 block">Cardholder Name</Label>
                          <Input placeholder="John Doe" required />
                        </div>
                        <div>
                          <Label className="text-xs font-semibold mb-1 block flex items-center gap-2">
                            Card Number
                            <Lock className="w-3 h-3 text-gray-500" />
                          </Label>
                          <Input 
                            placeholder="1234 5678 9012 3456" 
                            maxLength={19}
                            required 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs font-semibold mb-1 block">Expiration</Label>
                            <Input placeholder="MM / YY" required />
                          </div>
                          <div>
                            <Label className="text-xs font-semibold mb-1 block">CVV</Label>
                            <Input placeholder="123" maxLength={4} required />
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* PayPal Option */}
                  <label className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input type="radio" name="payment" className="mt-1 mr-3" />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">PayPal</div>
                      <div className="text-xs text-gray-500 mt-1">Fast, secure, and encrypted</div>
                    </div>
                  </label>
                </div>

                {/* Security Badge */}
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
                  <Lock className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-blue-900">
                    Your payment information is encrypted and secure. We use industry-standard 256-bit SSL encryption to protect your data.
                  </div>
                </div>
              </div>

              {/* Discount Code */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold mb-4">Promo Code</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code (Try: SAVE10, SAVE20, or FIRST)"
                    value={checkoutState.discountCode}
                    onChange={(e) => setCheckoutState(prev => ({ ...prev, discountCode: e.target.value }))}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={handleApplyDiscount}
                    variant="outline"
                    className="px-4"
                  >
                    Apply
                  </Button>
                </div>
                {checkoutState.discountApplied && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-800 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Discount applied! You save ${checkoutState.discountAmount.toFixed(2)}
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="border border-gray-200 rounded-lg p-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox 
                    checked={checkoutState.termsAccepted}
                    onCheckedChange={(checked) => setCheckoutState(prev => ({ ...prev, termsAccepted: checked as boolean }))}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      I agree to the <a href="#" className="text-[#FF7A59] hover:underline font-semibold">Terms of Service</a> and <a href="#" className="text-[#FF7A59] hover:underline font-semibold">Privacy Policy</a>
                    </p>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={checkoutState.isProcessing || !checkoutState.termsAccepted}
                className="w-full bg-[#FF7A59] hover:bg-[#ff6844] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-lg"
              >
                {checkoutState.isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Complete Purchase - $${total.toFixed(2)}`
                )}
              </button>

              <p className="text-center text-xs text-gray-500">
                By completing this purchase, you agree to our terms. Your information is secure and encrypted.
              </p>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <OrderSummary
              products={SAMPLE_PRODUCTS}
              subtotal={subtotal}
              addOnsPrice={addOnsPrice}
              shippingCost={shippingCost}
              discountAmount={checkoutState.discountAmount}
              total={total}
              addBowl={checkoutState.addBowl}
              addDrinker={checkoutState.addDrinker}
              addSupplement={checkoutState.addSupplement}
              addToy={checkoutState.addToy}
              addonPrices={ADDON_PRICES}
              onToggleBowl={(checked) => setCheckoutState(prev => ({ ...prev, addBowl: checked }))}
              onToggleDrinker={(checked) => setCheckoutState(prev => ({ ...prev, addDrinker: checked }))}
              onToggleSupplement={(checked) => setCheckoutState(prev => ({ ...prev, addSupplement: checked }))}
              onToggleToy={(checked) => setCheckoutState(prev => ({ ...prev, addToy: checked }))}
            />

            {/* Trust Badges */}
            <div className="mt-8 space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm text-green-900">31-Day Money-Back Guarantee</p>
                    <p className="text-xs text-green-800 mt-1">Not satisfied? Full refund, no questions asked.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm text-blue-900">Secure Checkout</p>
                    <p className="text-xs text-blue-800 mt-1">SSL encrypted • PCI DSS compliant</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm text-amber-900">Vet Developed Formula</p>
                    <p className="text-xs text-amber-800 mt-1">Created by certified veterinary nutritionists</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
