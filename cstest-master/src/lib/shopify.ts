// Shopify Storefront API Client
// Uses GraphQL to fetch products and manage cart

const SHOPIFY_STORE_NAME = import.meta.env.VITE_SHOPIFY_STORE_NAME;
const SHOPIFY_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-04';

const SHOPIFY_ENDPOINT = `https://${SHOPIFY_STORE_NAME}.myshopify.com/api/${API_VERSION}/graphql.json`;

export interface ShopifyGraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

/**
 * Execute GraphQL query against Shopify Storefront API
 */
export async function shopifyFetch<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<ShopifyGraphQLResponse<T>> {
  const response = await fetch(SHOPIFY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    console.error('Shopify GraphQL errors:', data.errors);
    throw new Error(data.errors[0].message);
  }

  return data;
}

/**
 * Fetch all products from Shopify
 */
export async function getProducts(first: number = 10) {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            description
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  available
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch(query, { first });
  return response.data?.products?.edges?.map((edge: any) => edge.node) || [];
}

/**
 * Fetch a single product by handle
 */
export async function getProductByHandle(handle: string) {
  const query = `
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        description
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              available
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch(query, { handle });
  return response.data?.productByHandle || null;
}

/**
 * Create a new cart
 */
export async function createCart(lines: Array<{ variantId: string; quantity: number }>) {
  const query = `
    mutation CreateCart($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      handle
                      title
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  const input = { lines: lines.map(line => ({ merchandiseId: line.variantId, quantity: line.quantity })) };
  const response = await shopifyFetch(query, { input });
  return response.data?.cartCreate?.cart || null;
}

/**
 * Fetch cart by ID
 */
export async function getCart(cartId: string) {
  const query = `
    query GetCart($id: ID!) {
      cart(id: $id) {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    handle
                    title
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  const response = await shopifyFetch(query, { id: cartId });
  return response.data?.cart || null;
}

/**
 * Add line items to cart
 */
export async function addToCart(cartId: string, lines: Array<{ variantId: string; quantity: number }>) {
  const query = `
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  const inputs = lines.map(line => ({ merchandiseId: line.variantId, quantity: line.quantity }));
  const response = await shopifyFetch(query, { cartId, lines: inputs });
  return response.data?.cartLinesAdd?.cart || null;
}

/**
 * Remove line items from cart
 */
export async function removeFromCart(cartId: string, lineIds: string[]) {
  const query = `
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch(query, { cartId, lineIds });
  return response.data?.cartLinesRemove?.cart || null;
}
