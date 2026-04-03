# Shopify Storefront API Integration

This project is set up to use Shopify's Storefront API for a headless ecommerce experience.

## Setup Instructions

### 1. Get Shopify Credentials

1. Go to your Shopify Admin Dashboard
2. Navigate to **Settings → Apps and integrations → Develop apps**
3. Create a new app or use an existing one
4. Click on the app and go to **Configuration**
5. Enable **Storefront API**
6. Copy your:
   - **Store name** (e.g., `mystore` from `mystore.myshopify.com`)
   - **Storefront Access Token** (under "Admin API access tokens")
   - **API version** (use `2024-04` or latest)

### 2. Configure Environment Variables

Create a `.env.local` file in the project root with:

```env
VITE_SHOPIFY_STORE_NAME=mystore
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_access_token_here
VITE_SHOPIFY_API_VERSION=2024-04
```

### 3. Set Up React App

Wrap your app with the `CartProvider`:

```tsx
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      {/* Your app components */}
    </CartProvider>
  );
}

export default App;
```

## API Usage

### Fetching Products

```tsx
import { useProducts, useProductByHandle } from './hooks/useProducts';

function ProductList() {
  const { products, loading, error } = useProducts(10);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <img src={product.images[0]?.url} alt={product.images[0]?.altText} />
          <p>${product.priceRange.minVariantPrice.amount}</p>
        </div>
      ))}
    </div>
  );
}
```

### Managing Cart

```tsx
import { useCart } from './context/CartContext';

function ShoppingCart() {
  const { items, addItem, removeItem, total, checkoutUrl } = useCart();

  return (
    <div>
      <h2>Cart ({items.length} items)</h2>
      {items.map(item => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>Qty: {item.quantity}</p>
          <p>${item.price.amount}</p>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <p>Total: ${total}</p>
      {checkoutUrl && (
        <a href={checkoutUrl}>Proceed to Checkout</a>
      )}
    </div>
  );
}
```

### Direct API Calls

For advanced use cases, use the `shopifyFetch` function directly:

```tsx
import { shopifyFetch } from './lib/shopify';

const query = `
  query {
    collections(first: 10) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;

const response = await shopifyFetch(query);
```

## File Structure

```
src/
├── lib/
│   └── shopify.ts          # Shopify API client (GraphQL)
├── hooks/
│   └── useProducts.ts      # Product hooks
├── context/
│   └── CartContext.tsx     # Cart state management
└── ...
```

## API Methods

### Products
- `getProducts(first: number)` - Fetch multiple products
- `getProductByHandle(handle: string)` - Fetch a single product by handle

### Cart
- `createCart(lines: CartLine[])` - Create a new cart
- `getCart(cartId: string)` - Fetch cart details
- `addToCart(cartId: string, lines: CartLine[])` - Add items to cart
- `removeFromCart(cartId: string, lineIds: string[])` - Remove items from cart

## Shopify Dashboard Integration

Your theme file is set up in `shopify-theme/layout/theme.liquid`. You can:

1. Build your React app: `npm run build`
2. Upload the build output to Shopify Assets
3. Reference the bundle in your theme

## Next Steps

1. Replace placeholder credentials in `.env.local`
2. Test with `npm run dev`
3. Build with `npm run build`
4. Deploy to Vercel, Netlify, or your hosting platform
5. Deploy your Shopify theme

## Resources

- [Shopify Storefront API Docs](https://shopify.dev/api/storefront)
- [Shopify GraphQL Admin API](https://shopify.dev/api/admin-graphql)
- [Shopify Theme Development](https://shopify.dev/themes)
