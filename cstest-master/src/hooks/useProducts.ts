import { useState, useEffect, useCallback } from 'react';
import { getProducts, getProductByHandle } from '../lib/shopify';

interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: Array<{ url: string; altText: string }>;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  variants: Array<{
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    available: boolean;
  }>;
}

export function useProducts(limit: number = 10) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts(limit);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit]);

  return { products, loading, error };
}

export function useProductByHandle(handle: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!handle) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductByHandle(handle);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch product'));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  return { product, loading, error };
}
