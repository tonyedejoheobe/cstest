# Shopify Theme Conversion TODO

## Goal: Convert React landing+checkout to Shopify theme w/ identical UI/animations via React bundle.

**Current status**: Partial hybrid setup in `cstest-master/shopify-theme/`.

## Steps:

### 1. Build React App [x]
- ✓ npm run build
- ✓ Copy bundles/images to assets/
- Run `npm run build`
- Copy dist/assets/* to shopify-theme/assets/
- Note bundle hashes for theme.liquid

### 2. Complete Theme Structure [ ]
- Create sections/: hero.liquid, checkout.liquid, etc. (render React props?)
- snippets/: header.liquid, footer.liquid
- templates/index.liquid: {% section 'hero' %} {% section 'stats' %} etc.

### 3. Migrate Assets [x]
- ✓ Images to assets/
- ✓ app.css/js
- fonts.css (empty, optional)
- Copy src/assets/* → shopify-theme/assets/
- Build Tailwind CSS → assets/app.css
- Copy fonts/icons SVGs

### 4. Update theme.liquid [ ]
- Inject {{ cart | json }}, {{ collections.frontpage.products | json }}
- Reference correct app.js/css hashes
- Add Tailwind CDN + custom CSS

### 5. Pure Liquid Components [ ]
- header.liquid, footer.liquid from React
- Product cards, CTAs as snippets
- AJAX cart JS (no React CartContext, use Shopify Cart API)

### 6. Animations/Interactivity [ ]
- Vanilla JS for ImageComparisonSlider
- Tailwind transitions (hover:scale)
- GSAP or CSS for React-like animations

### 7. Checkout Integration [ ]
- Custom checkout form → Shopify checkout links
- Line item properties for addons
- Discount codes via cart attributes

### 8. Testing & Package [ ]
- `shopify theme push`
- Create zip or GitHub repo w/ theme files
- Add README w/ setup (add products to 'frontpage')

**Progress**: Steps 1,3 [x] - Assets ready!

Next step: Execute step 1 (build React app).

