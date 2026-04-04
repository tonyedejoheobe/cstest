# Happy Dog Bites Shopify Theme

Hybrid React + Shopify theme w/ identical UI/animations from original site.

## Setup

1. Upload `cstest-master/shopify-theme/` zip to Shopify Admin > Online Store > Themes

2. **Required**: Create 'frontpage' collection, add dog food products (variants for sizes).

3. Publish theme.

4. **Optional API** (products/cart in React):
   - In original React project: Add `.env.local` w/ your Storefront API creds
   - `npm run build`
   - Copy new dist/assets/app.{js,css} to theme/assets/

## Features
- Full landing page (hero, stats, testimonials, FAQ)
- Checkout flow w/ Shopify Storefront
- Tailwind UI/animations
- Responsive mobile-first

## Customization
- Edit React source in `../src/` (cstest-master/src/)
- Rebuild bundles

Ready!
