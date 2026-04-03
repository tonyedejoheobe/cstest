import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createCart, getCart, addToCart, removeFromCart } from '../lib/shopify';

interface CartItem {
  id: string;
  variantId: string;
  quantity: number;
  title: string;
  price: { amount: string; currencyCode: string };
}

interface CartContextType {
  cartId: string | null;
  items: CartItem[];
  loading: boolean;
  error: Error | null;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  total: string;
  checkoutUrl: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState('0');
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  // Initialize cart from localStorage
  useEffect(() => {
    const savedCartId = localStorage.getItem('shopifyCartId');
    if (savedCartId) {
      setCartId(savedCartId);
      fetchCart(savedCartId);
    }
  }, []);

  const fetchCart = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const cart = await getCart(id);
      if (cart) {
        const cartItems: CartItem[] = cart.lines.edges.map((edge: any) => ({
          id: edge.node.id,
          variantId: edge.node.merchandise.id,
          quantity: edge.node.quantity,
          title: edge.node.merchandise.title || edge.node.merchandise.product.title,
          price: edge.node.merchandise.price,
        }));
        setItems(cartItems);
        setTotal(cart.cost.totalAmount.amount);
        setCheckoutUrl(cart.checkoutUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch cart'));
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = useCallback(
    async (variantId: string, quantity: number) => {
      try {
        setLoading(true);
        let currentCartId = cartId;

        // Create cart if it doesn't exist
        if (!currentCartId) {
          const newCart = await createCart([{ variantId, quantity }]);
          if (newCart) {
            currentCartId = newCart.id;
            setCartId(currentCartId);
            localStorage.setItem('shopifyCartId', currentCartId);
          }
        } else {
          // Add to existing cart
          const updatedCart = await addToCart(currentCartId, [{ variantId, quantity }]);
          if (updatedCart) {
            await fetchCart(currentCartId);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to add item to cart'));
      } finally {
        setLoading(false);
      }
    },
    [cartId, fetchCart]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cartId) return;

      try {
        setLoading(true);
        await removeFromCart(cartId, [lineId]);
        await fetchCart(cartId);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to remove item from cart'));
      } finally {
        setLoading(false);
      }
    },
    [cartId, fetchCart]
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cartId) return;

      try {
        setLoading(true);
        // Remove the item and add it back with new quantity
        const item = items.find(i => i.id === lineId);
        if (item) {
          await removeFromCart(cartId, [lineId]);
          if (quantity > 0) {
            await addToCart(cartId, [{ variantId: item.variantId, quantity }]);
          }
          await fetchCart(cartId);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to update quantity'));
      } finally {
        setLoading(false);
      }
    },
    [cartId, items, fetchCart]
  );

  const clearCart = useCallback(() => {
    setCartId(null);
    setItems([]);
    setCheckoutUrl(null);
    localStorage.removeItem('shopifyCartId');
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartId,
        items,
        loading,
        error,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        checkoutUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
