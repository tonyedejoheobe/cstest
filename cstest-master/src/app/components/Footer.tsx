import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Happy Dog Bites</h3>
            <p className="text-sm text-gray-400 mb-4">
              Providing premium, vet-developed nutrition for happy, healthy dogs.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-[#FF7A59]" />
                <span>1-800-DOG-FOOD</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-[#FF7A59]" />
                <span>support@dogfood.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-[#FF7A59]" />
                <span>USA Based</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
<a href="/collections/raw-dog-food" className="hover:text-[#FF7A59] transition">
                  Raw Dog Food
                </a>
              </li>
              <li>
<a href="/collections/supplements" className="hover:text-[#FF7A59] transition">
                  Supplements
                </a>
              </li>
              <li>
<a href="/collections/accessories" className="hover:text-[#FF7A59] transition">
                  Accessories
                </a>
              </li>
              <li>
<a href="/collections/recipes" className="hover:text-[#FF7A59] transition">
                  Recipes
                </a>
              </li>
              <li>
<a href="/collections/subscribe-save" className="hover:text-[#FF7A59] transition">
                  Subscribe & Save
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
<a href="/pages/contact" className="hover:text-[#FF7A59] transition">
                  Contact Us
                </a>
              </li>
              <li>
<a href="/pages/faq" className="hover:text-[#FF7A59] transition">
                  FAQ
                </a>
              </li>
              <li>
<a href="/pages/shipping" className="hover:text-[#FF7A59] transition">
                  Shipping Info
                </a>
              </li>
              <li>
<a href="/pages/returns" className="hover:text-[#FF7A59] transition">
                  Returns
                </a>
              </li>
              <li>
<a href="/pages/track-order" className="hover:text-[#FF7A59] transition">
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li>
<a href="/pages/about" className="hover:text-[#FF7A59] transition">
                  About Us
                </a>
              </li>
              <li>
<a href="/blogs/news" className="hover:text-[#FF7A59] transition">
                  Blog
                </a>
              </li>
              <li>
<a href="/pages/careers" className="hover:text-[#FF7A59] transition">
                  Careers
                </a>
              </li>
              <li>
<a href="/pages/press" className="hover:text-[#FF7A59] transition">
                  Press
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-[#FF7A59] rounded-lg flex items-center justify-center transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-[#FF7A59] rounded-lg flex items-center justify-center transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-[#FF7A59] rounded-lg flex items-center justify-center transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-800 mb-6" />

        {/* Bottom Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-400">
          <div>
            <p>&copy; {currentYear} Happy Dog Bites. All rights reserved.</p>
          </div>
          <div className="flex justify-center gap-4">
<a href="/policies/privacy-policy" className="hover:text-[#FF7A59] transition">
              Privacy Policy
            </a>
<a href="/policies/terms-of-service" className="hover:text-[#FF7A59] transition">
              Terms of Service
            </a>
<a href="/policies/cookie-policy" className="hover:text-[#FF7A59] transition">
              Cookie Policy
            </a>
          </div>
          <div className="text-right">
            <p>Made with ❤️ for happy dogs</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
