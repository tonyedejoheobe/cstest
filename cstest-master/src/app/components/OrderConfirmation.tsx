import { CheckCircle, Package, Truck, Mail, Phone, MapPin } from 'lucide-react';

interface OrderConfirmationProps {
  onBackHome?: () => void;
}

export function OrderConfirmation({ onBackHome }: OrderConfirmationProps) {
  const orderNumber = `ORD-${Date.now().toString().slice(-8).toUpperCase()}`;
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Success Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Order Confirmed! 🎉</h1>
          <p className="text-lg text-green-100">
            Thank you for your purchase. Your order has been received and is being prepared.
          </p>
        </div>
      </section>

      {/* Order Details */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
        {/* Order Number & Email */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-2xl font-bold text-gray-900">{orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Order Date</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Date().toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <Mail className="w-5 h-5 text-[#FF7A59] flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wide">Confirmation Email</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">sent@example.com</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Package className="w-5 h-5 text-[#FF7A59] flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wide">Order Total</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">$124.97</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Truck className="w-5 h-5 text-[#FF7A59] flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wide">Estimated Delivery</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{estimatedDelivery}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Status</h2>
          <div className="space-y-4">
            {[
              { step: 'Order Confirmed', completed: true },
              { step: 'Payment Processed', completed: true },
              { step: 'Preparing for Shipment', completed: false, current: true },
              { step: 'Shipped', completed: false },
              { step: 'Delivered', completed: false },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    item.completed
                      ? 'bg-green-100 text-green-700'
                      : item.current
                        ? 'bg-[#FF7A59] text-white'
                        : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {item.completed ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <p
                    className={`font-semibold ${
                      item.completed || item.current ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {item.step}
                  </p>
                </div>
                {item.current && <span className="text-xs font-bold text-[#FF7A59]">IN PROGRESS</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Items</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-start pb-4 border-b border-gray-200">
              <div>
                <p className="font-semibold text-gray-900">Premium Raw Dog Food - Chicken (10 lb)</p>
                <p className="text-sm text-gray-600 mt-1">Qty: 1</p>
              </div>
              <p className="font-bold text-gray-900">$49.99</p>
            </div>
            <div className="flex justify-between items-start pb-4 border-b border-gray-200">
              <div>
                <p className="font-semibold text-gray-900">Premium Stainless Steel Food Bowl</p>
                <p className="text-sm text-gray-600 mt-1">Qty: 1</p>
              </div>
              <p className="font-bold text-gray-900">$24.99</p>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">Premium Puppy Chew Toy</p>
                <p className="text-sm text-gray-600 mt-1">Qty: 1 (FREE GIFT)</p>
              </div>
              <p className="font-bold text-green-700">FREE</p>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#FF7A59]" />
                Shipping Address
              </h3>
              <p className="text-gray-700">
                John Doe<br />
                123 Main Street<br />
                New York, NY 10001<br />
                USA
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#FF7A59]" />
                Additional Info
              </h3>
              <p className="text-sm text-gray-600 space-y-2">
                <div>
                  <p className="font-semibold text-gray-900">Email:</p>
                  <p>john@example.com</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mt-3">Phone:</p>
                  <p>(555) 555-0000</p>
                </div>
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-900">
              <span className="font-bold">✓ 31-Day Money-Back Guarantee</span><br />
              <span className="text-xs">Not satisfied? Full refund, no questions asked.</span>
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <span className="font-bold">✓ Free Returns</span><br />
              <span className="text-xs">30-day return window on all orders.</span>
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-900">
              <span className="font-bold">✓ Vet Developed</span><br />
              <span className="text-xs">Created by certified veterinary nutritionists.</span>
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={onBackHome}
            className="bg-[#FF7A59] hover:bg-[#ff6844] text-white font-bold px-8 py-4 rounded-lg transition-colors duration-200 text-lg"
          >
            Continue Shopping
          </button>
          <p className="text-sm text-gray-600 mt-4">
            You can track your order anytime using order number <span className="font-bold">{orderNumber}</span>
          </p>
        </div>
      </section>
    </main>
  );
}
