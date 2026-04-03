# Shopify React Integration TODO

## [x] Step 1: Build Production Bundle
- Fixed scripts/tsconfig
- `npm run build` → dist/assets/app-[hash].js/css (user verify/replace in theme.liquid)

## [x] Step 2: Create Shopify Theme Structure (Dawn-based)
- theme.liquid with #root + bundles + ShopifyData window var

## [x] Step 3: Migrate Assets & Data in React Code
- App.tsx: Liquid asset_urls, products/cart from window.ShopifyData
- Checkout.tsx: cart.lines loop

## [ ] Step 4: Shopify-Specific Enhancements
- Header cart count
- Buy → AJAX cart/form

## [ ] Step 5: Test & Deploy
- Copy assets/images
- `theme push --store=your-store.myshopify.com --password=...`
- Test products/cart

Progress: 3/5
Initial commit completed on blackboxai/storefront-complete
