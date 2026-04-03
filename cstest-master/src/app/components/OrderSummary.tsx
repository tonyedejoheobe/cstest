import { Minus, Plus, X } from 'lucide-react';
import { OrderSummaryItem } from './OrderSummaryItem';
import { Checkbox } from './ui/checkbox';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
}

interface OrderSummaryProps {
  products: Product[];
  subtotal: number;
  addOnsPrice: number;
  shippingCost: number;
  discountAmount: number;
  total: number;
  addBowl?: boolean;
  addDrinker?: boolean;
  addSupplement?: boolean;
  addToy?: boolean;
  addonPrices?: { bowl: number; drinker: number; supplement: number; toy: number };
  onToggleBowl?: (checked: boolean) => void;
  onToggleDrinker?: (checked: boolean) => void;
  onToggleSupplement?: (checked: boolean) => void;
  onToggleToy?: (checked: boolean) => void;
  onRemoveItem?: (productId: string) => void;
}

export function OrderSummary({
  products,
  subtotal,
  addOnsPrice,
  shippingCost,
  discountAmount,
  total,
  addBowl,
  addDrinker,
  addSupplement,
  addToy,
  addonPrices,
  onToggleBowl,
  onToggleDrinker,
  onToggleSupplement,
  onToggleToy,
}: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 sticky top-8 max-h-[calc(100vh-120px)] overflow-y-auto shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FF7A59] to-[#ff6844] text-white p-6 rounded-t-lg">
        <h3 className="text-xl font-bold">Order Summary</h3>
        <p className="text-xs text-orange-100 mt-1">Complete your purchase</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Product List */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Your Items</h4>
          <div className="space-y-3">
            {products.map(product => (
              <OrderSummaryItem 
                key={product.id} 
                product={product}
              />
            ))}
          </div>
        </div>

        {/* Add-ons Section */}
        {addonPrices && (
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Add These Essentials</h4>
            <div className="space-y-2">
              {/* Food Bowl */}
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-orange-50 transition">
                <Checkbox 
                  checked={addBowl || false}
                  onCheckedChange={(checked) => onToggleBowl?.(checked as boolean)}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">Food Bowl</p>
                  <p className="text-xs text-gray-500">Stainless steel</p>
                </div>
                <span className="font-bold text-sm text-gray-900 flex-shrink-0">${addonPrices.bowl.toFixed(2)}</span>
              </label>

              {/* Water Drinker */}
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-orange-50 transition">
                <Checkbox 
                  checked={addDrinker || false}
                  onCheckedChange={(checked) => onToggleDrinker?.(checked as boolean)}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">Water Drinker</p>
                  <p className="text-xs text-gray-500">Automatic, keeps water fresh</p>
                </div>
                <span className="font-bold text-sm text-gray-900 flex-shrink-0">${addonPrices.drinker.toFixed(2)}</span>
              </label>

              {/* Probiotic Supplement */}
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-orange-50 transition">
                <Checkbox 
                  checked={addSupplement || false}
                  onCheckedChange={(checked) => onToggleSupplement?.(checked as boolean)}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">Probiotic Supplement</p>
                  <p className="text-xs text-gray-500">Superfood-powered nutrition</p>
                </div>
                <span className="font-bold text-sm text-gray-900 flex-shrink-0">${addonPrices.supplement.toFixed(2)}</span>
              </label>

              {/* Free Toy */}
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-orange-50 transition">
                <Checkbox 
                  checked={addToy || false}
                  onCheckedChange={(checked) => onToggleToy?.(checked as boolean)}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">Premium Puppy Chew Toy</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="inline-flex items-center px-1.5 py-0 rounded text-xs font-bold bg-green-100 text-green-800">FREE</span>
                    Bonus gift with order
                  </p>
                </div>
                <span className="font-bold text-sm text-green-700 flex-shrink-0">FREE</span>
              </label>
            </div>
          </div>
        )}

        {/* Pricing Breakdown */}
        <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
          </div>

          {(addBowl || addDrinker || addSupplement || addToy) && addonPrices && (
            <div className="space-y-1">
              {addBowl && (
                <div className="flex justify-between text-gray-600">
                  <span className="text-xs">+ Food Bowl</span>
                  <span className="font-semibold text-gray-900">${addonPrices.bowl.toFixed(2)}</span>
                </div>
              )}
              {addDrinker && (
                <div className="flex justify-between text-gray-600">
                  <span className="text-xs">+ Water Drinker</span>
                  <span className="font-semibold text-gray-900">${addonPrices.drinker.toFixed(2)}</span>
                </div>
              )}
              {addSupplement && (
                <div className="flex justify-between text-gray-600">
                  <span className="text-xs">+ Probiotic Supplement</span>
                  <span className="font-semibold text-gray-900">${addonPrices.supplement.toFixed(2)}</span>
                </div>
              )}
              {addToy && (
                <div className="flex justify-between text-gray-600">
                  <span className="text-xs">+ Puppy Chew Toy</span>
                  <span className="font-semibold text-green-700">FREE</span>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-semibold">
              {shippingCost === 0 ? (
                <span className="text-green-700 font-bold">FREE</span>
              ) : (
                <span className="text-gray-900">${shippingCost.toFixed(2)}</span>
              )}
            </span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between text-green-700 font-semibold pt-1">
              <span>Discount Applied</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="border-t border-gray-200 pt-4 bg-orange-50 -mx-6 px-6 py-4 rounded-b">
          <div className="flex justify-between items-baseline gap-2">
            <span className="text-gray-700 font-semibold">Total:</span>
            <span className="text-3xl font-bold text-[#FF7A59]">${total.toFixed(2)}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Includes all taxes & fees</p>
        </div>

        {/* Trust Badge */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-xs text-green-900">
            <span className="font-bold">✓ Safe & Secure</span> - 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
}
