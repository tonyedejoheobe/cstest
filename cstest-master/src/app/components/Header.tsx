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
          {/* Logo */}
          <button
            onClick={onHomeClick}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <div className="w-10 h-10 bg-[#FF7A59] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🐕</span>
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold text-gray-900">Happy Dog Bites</h1>
              <p className="text-xs text-gray-500">Premium Nutrition</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={onCheckoutClick}
              className="text-sm font-medium text-gray-700 hover:text-[#FF7A59] transition"
            >
              Shop
            </button>
            <a href="#about" className="text-sm font-medium text-gray-700 hover:text-[#FF7A59] transition">
              About
            </a>
            <a href="#testimonials" className="text-sm font-medium text-gray-700 hover:text-[#FF7A59] transition">
              Reviews
            </a>
            <a href="#faq" className="text-sm font-medium text-gray-700 hover:text-[#FF7A59] transition">
              FAQ
            </a>
            <a href="mailto:support@dogfood.com" className="text-sm font-medium text-gray-700 hover:text-[#FF7A59] transition">
              Contact
            </a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {currentPage !== 'checkout' && currentPage !== 'confirmation' && (
              <button
                onClick={onCheckoutClick}
className="hidden sm:flex items-center gap-2 bg-[#FF7A59] hover:bg-[#ff6844] text-white px-4 py-2 rounded-lg transition font-semibold text-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Shop Now ({(window as any).ShopifyData?.cart?.item_count || 0})</span>
              </button>
            )}


            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
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
          <nav className="md:hidden mt-4 pb-4 space-y-3 border-t border-gray-200 pt-4">
            <button
              onClick={() => {
                onCheckoutClick?.();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm font-medium text-gray-700 hover:text-[#FF7A59] transition"
            >
              Shop
            </button>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 hover:text-[#FF7A59] transition"
            >
              About
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 hover:text-[#FF7A59] transition"
            >
              Reviews
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 hover:text-[#FF7A59] transition"
            >
              FAQ
            </a>
            <a
              href="mailto:support@dogfood.com"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 hover:text-[#FF7A59] transition"
            >
              Contact
            </a>
            {currentPage !== 'checkout' && currentPage !== 'confirmation' && (
              <button
                onClick={() => {
                  onCheckoutClick?.();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-[#FF7A59] hover:bg-[#ff6844] text-white px-4 py-2 rounded-lg transition font-semibold text-sm"
              >
                Shop Now
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
