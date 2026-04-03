/**
 * Shopify Storefront API Client
 * Handles GraphQL queries to Shopify Storefront API
 */

const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';

interface ShopifyGraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

/**
 * Execute a GraphQL query against Shopify Storefront API
 */
export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    console.error('Missing Shopify configuration. Check VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN');
    throw new Error('Shopify API credentials not configured');
  }

  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json: ShopifyGraphQLResponse<T> = await response.json();

    if (json.errors) {
      console.error('Shopify API errors:', json.errors);
      throw new Error(json.errors[0].message || 'Shopify API error');
    }

    return json.data as T;
  } catch (error) {
    console.error('Shopify fetch error:', error);
    throw error;
  }
}

/**
 * Fetch all products from Shopify
 */
export async function getProducts() {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
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
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  sku
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                }
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
          }
        }
      }
    }
  `;

  interface ProductsResponse {
    products: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          handle: string;
          description: string;
          priceRange: {
            minVariantPrice: { amount: string; currencyCode: string };
            maxVariantPrice: { amount: string; currencyCode: string };
          };
          variants: {
            edges: Array<{
              node: {
                id: string;
                title: string;
                sku: string;
                price: { amount: string; currencyCode: string };
                image: { url: string; altText: string };
              };
            }>;
          };
          images: {
            edges: Array<{
              node: { url: string; altText: string };
            }>;
          };
        };
      }>;
    };
  }

  const data = await shopifyFetch<ProductsResponse>(query, { first: 10 });

  return data.products.edges.map(edge => ({
    id: edge.node.id,
    title: edge.node.title,
    handle: edge.node.handle,
    description: edge.node.description,
    priceRange: edge.node.priceRange,
    variants: edge.node.variants.edges.map(v => v.node),
    image: edge.node.images.edges[0]?.node || null,
  }));
}

/**
 * Fetch product by handle
 */
export async function getProductByHandle(handle: string) {
  const query = `
    query getProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
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
        variants(first: 10) {
          edges {
            node {
              id
              title
              sku
              price {
                amount
                currencyCode
              }
              image {
                url
                altText
              }
            }
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  `;

  interface ProductResponse {
    productByHandle: {
      id: string;
      title: string;
      handle: string;
      description: string;
      priceRange: {
        minVariantPrice: { amount: string; currencyCode: string };
        maxVariantPrice: { amount: string; currencyCode: string };
      };
      variants: {
        edges: Array<{
          node: {
            id: string;
            title: string;
            sku: string;
            price: { amount: string; currencyCode: string };
            image: { url: string; altText: string };
          };
        }>;
      };
      images: {
        edges: Array<{
          node: { url: string; altText: string };
        }>;
      };
    };
  }

  const data = await shopifyFetch<ProductResponse>(query, { handle });
  const product = data.productByHandle;

  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    priceRange: product.priceRange,
    variants: product.variants.edges.map(v => v.node),
    images: product.images.edges.map(e => e.node),
  };
}

/**
 * Create a checkout and return the checkout URL
 */
export async function createCheckout(lineItems: Array<{ variantId: string; quantity: number }>) {
  const query = `
    mutation createCheckout($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
          lineItems(first: 10) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  title
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  interface CheckoutResponse {
    checkoutCreate: {
      checkout: {
        id: string;
        webUrl: string;
        lineItems: { edges: any[] };
      };
      checkoutUserErrors: Array<{ field: string; message: string }>;
    };
  }

  const input = {
    lineItems,
  };

  const data = await shopifyFetch<CheckoutResponse>(query, { input });

  if (data.checkoutCreate.checkoutUserErrors.length > 0) {
    throw new Error(data.checkoutCreate.checkoutUserErrors[0].message);
  }

  return data.checkoutCreate.checkout;
}

/**
 * Apply discount code to checkout
 */
export async function applyDiscountCode(checkoutId: string, discountCode: string) {
  const query = `
    mutation applyDiscountCode($checkoutId: ID!, $discountCode: String!) {
      checkoutDiscountCodeApply(checkoutId: $checkoutId, discountCode: $discountCode) {
        checkout {
          id
          webUrl
          discountApplications(first: 10) {
            edges {
              node {
                ... on DiscountCodeApplication {
                  code
                  applicable
                }
              }
            }
          }
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  interface DiscountResponse {
    checkoutDiscountCodeApply: {
      checkout: {
        id: string;
        webUrl: string;
        discountApplications: { edges: any[] };
      };
      checkoutUserErrors: Array<{ field: string; message: string }>;
    };
  }

  try {
    const data = await shopifyFetch<DiscountResponse>(query, { checkoutId, discountCode });

    if (data.checkoutDiscountCodeApply.checkoutUserErrors.length > 0) {
      return {
        success: false,
        error: data.checkoutDiscountCodeApply.checkoutUserErrors[0].message,
      };
    }

    return {
      success: true,
      checkout: data.checkoutDiscountCodeApply.checkout,
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
    };
  }
}
