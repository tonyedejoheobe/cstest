declare global {
  interface Window {
    ShopifyAssetUrls?: {
      kibble: string;
      rawFood: string;
      design1: string;
      design2: string;
      design3: string;
    };
    ShopifyData?: {
      cart: any[];
      products: any[];
      collection: any;
    };
  }
}

export {};

