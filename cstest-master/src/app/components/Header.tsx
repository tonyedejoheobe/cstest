import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onCheckoutClick?: () => void;
  onHomeClick?: () => void;
  currentPage?: 'home' | 'checkout' | 'confirmation';
}

export function Header({ onCheckoutClick, onHomeClick, currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - always home button */}
          <button
            onClick={onHomeClick}
            className="flex items-center gap-2 hover:opacity-80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF7A59]"
          >
            <div className="w-10 h-10 bg-[#FF7A59] rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">🐕</span>
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold text-gray-900 leading-tight">Happy Dog Bites</h1>
              <p className="text-xs text-gray-500">Premium Nutrition</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Home Link */}
            <button
              onClick={onHomeClick}
              className={`text-sm font-medium transition-all duration-200 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7A59] ${
                currentPage === 'home' 
                  ? 'text-[#FF7A59] font-semibold ring-2 ring-[#FF7A59]/20 bg-[#FF7A59]/5' 
                  : 'text-gray-700 hover:text-[#FF7A59] hover:bg-[#FF7A59]/5'
              }`}
            >
              Home
            </button>
            
            {/* Checkout/Shop Link */}
            <button
              onClick={onCheckoutClick}
              className={`text-sm font-medium transition-all duration-200 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7A59] ${
                currentPage === 'checkout' || currentPage === 'confirmation' 
                  ? 'text-[#FF7A59] font-semibold ring-2 ring-[#FF7A59]/20 bg-[#FF7A59]/5' 
                  : 'text-gray-700 hover:text-[#FF7A59] hover:bg-[#FF7A59]/5'
              }`}
            >
              Shop
            </button>

            <a href="/pages/about" className="text-sm font-medium text-gray-700 hover:text-[#FF7A59] hover:bg-[#FF7A59]/5 px-2 py-1 rounded-md transition-all duration-200">
              About
            </a>
            <a href="/pages/reviews" className="text-sm font-medium text-gray-700 hover:text-[#FF7A59] hover:bg-[#FF7A59]/5 px-2 py-1 rounded-md transition-all duration-200">
              Reviews
            </a>
            <a href="/pages/faq" className="text-sm font-medium text-gray-700 hover:text-[#FF7A59] hover:bg-[#FF7A59]/5 px-2 py-1 rounded-md transition-all duration-200">
              FAQ
            </a>
            <a href="/pages/contact" className="text-sm font-medium text-gray-700 hover:text-[#FF7A59] hover:bg-[#FF7A59]/5 px-2 py-1 rounded-md transition-all duration-200">
              Contact
            </a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {currentPage !== 'checkout' && currentPage !== 'confirmation' && (
              <button
                onClick={onCheckoutClick}
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#FF7A59] to-[#ff6844] hover:from-[#ff6844] hover:to-[#ff5a30] text-white px-6 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#FF7A59]/25"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Shop Now ({(window as any).ShopifyData?.cart?.item_count || 0})</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <nav className="mt-4 pb-6 space-y-3 border-t border-gray-200 pt-4 bg-gray-50 rounded-lg">
              {/* Home */}
              <button
                onClick={() => {
                  onHomeClick?.();
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-200 font-medium ${
                  currentPage === 'home'
                    ? 'bg-[#FF7A59]/10 text-[#FF7A59] font-semibold border-l-4 border-[#FF7A59]'
                    : 'text-gray-700 hover:bg-[#FF7A59]/5 hover:text-[#FF7A59]'
                }`}
              >
                Home
              </button>
              
              {/* Checkout */}
              <button
                onClick={() => {
                  onCheckoutClick?.();
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-200 font-medium ${
                  currentPage === 'checkout' || currentPage === 'confirmation'
                    ? 'bg-[#FF7A59]/10 text-[#FF7A59] font-semibold border-l-4 border-[#FF7A59]'
                    : 'text-gray-700 hover:bg-[#FF7A59]/5 hover:text-[#FF7A59]'
                }`}
              >
                Shop
              </button>

              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-4 text-gray-700 hover:bg-[#FF7A59]/5 hover:text-[#FF7A59] font-medium rounded-lg transition-all duration-200"
              >
                About
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-4 text-gray-700 hover:bg-[#FF7A59]/5 hover:text-[#FF7A59] font-medium rounded-lg transition-all duration-200"
              >
                Reviews
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-4 text-gray-700 hover:bg-[#FF7A59]/5 hover:text-[#FF7A59] font-medium rounded-lg transition-all duration-200"
              >
                FAQ
              </a>
              <a
                href="mailto:support@dogfood.com"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-4 text-gray-700 hover:bg-[#FF7A59]/5 hover:text-[#FF7A59] font-medium rounded-lg transition-all duration-200"
              >
                Contact
              </a>
              {currentPage !== 'checkout' && currentPage !== 'confirmation' && (
                <button
                  onClick={() => {
                    onCheckoutClick?.();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-[#FF7A59] to-[#ff6844] hover:from-[#ff6844] hover:to-[#ff5a30] text-white px-4 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 mt-2 focus:outline-none focus:ring-4 focus:ring-[#FF7A59]/25"
                >
                  Shop Now
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

