import React, { createContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getSubtotal: () => number;
  refreshCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Trae el carrito del backend
  const refreshCart = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/cart', {
        credentials: 'include',
      });
      const data: CartItem[] = await res.json();
      setCartItems(data);
    } catch (err) {
      console.error('Failed to fetch cart', err);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addToCart = async (item: CartItem) => {
    // Optimistic update
    setCartItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });

    try {
      await fetch(`http://localhost:8080/api/cart/${item.id}`, {
        method: 'POST',
        credentials: 'include',
      });
      await refreshCart();
    } catch (err) {
      console.error('Failed to add to cart', err);
      await refreshCart(); // revertir en caso de error
    }
  };

  const removeFromCart = async (itemId: string) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));

    try {
      await fetch(`http://localhost:8080/api/cart/${itemId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      await refreshCart();
    } catch (err) {
      console.error('Failed to remove from cart', err);
      await refreshCart();
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(i => (i.id === itemId ? { ...i, quantity } : i))
    );

    try {
      await fetch(`http://localhost:8080/api/cart/${itemId}?quantity=${quantity}`, {
        method: 'PUT',
        credentials: 'include',
      });
      await refreshCart();
    } catch (err) {
      console.error('Failed to update quantity', err);
      await refreshCart();
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    try {
      await fetch('http://localhost:8080/api/cart', {
        method: 'DELETE',
        credentials: 'include',
      });
      await refreshCart();
    } catch (err) {
      console.error('Failed to clear cart', err);
      await refreshCart();
    }
  };

  const getSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getSubtotal,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = React.useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};