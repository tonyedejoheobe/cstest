import { Minus, Plus, X } from 'lucide-react';
import { LazyImage } from './LazyImage';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
}

interface OrderSummaryItemProps {
  product: Product;
  onRemove?: (productId: string) => void;
}

export function OrderSummaryItem({ product, onRemove }: OrderSummaryItemProps) {
  const isFree = product.price === 0;
  const isDogFood = product.id === '1'; // Cannot remove dog food item

  return (
    <div className="flex gap-3 pb-4 border-b border-gray-200 last:border-b-0">
      {/* Product Image/Placeholder */}
      {product.image && (
        <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden">
          <LazyImage
            src={product.image}
            alt={product.name}
            className="w-16 h-16"
            placeholderBg="bg-gray-200"
          />
        </div>
      )}

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm text-gray-900 truncate">{product.name}</h4>
              {isFree && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 flex-shrink-0">
                  FREE
                </span>
              )}
              {isDogFood && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 flex-shrink-0">
                  REQUIRED
                </span>
              )}
            </div>
            {product.size && (
              <p className="text-xs text-gray-500 mt-1">{product.size}</p>
            )}
          </div>
          {!isDogFood && (
            <button
              onClick={() => onRemove?.(product.id)}
              className="flex-shrink-0 text-gray-400 hover:text-red-500 transition p-1"
              title="Remove item"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded px-2 py-1">
            <button className="hover:bg-gray-100 p-1 rounded transition">
              <Minus className="w-3 h-3 text-gray-600" />
            </button>
            <span className="text-xs font-semibold text-gray-700 w-6 text-center">
              {product.quantity}
            </span>
            <button className="hover:bg-gray-100 p-1 rounded transition">
              <Plus className="w-3 h-3 text-gray-600" />
            </button>
          </div>
          <div className="text-right">
            <p className="font-bold text-sm text-gray-900">
              {isFree ? (
                <span className="text-green-700">FREE</span>
              ) : (
                `$${(product.price * product.quantity).toFixed(2)}`
              )}
            </p>
            {!isFree && (
              <p className="text-xs text-gray-500">
                ${product.price.toFixed(2)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
