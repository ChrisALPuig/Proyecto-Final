import React, { createContext, useState, useEffect, ReactNode } from 'react';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface WishlistContextType {
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  refreshWishlist: () => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (itemId: string) => void;
  isInWishlist: (itemId: string) => boolean;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const wishlistCount = wishlistItems.length;

  // Trae la wishlist de la API
  const refreshWishlist = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/wishlist', {
        credentials: 'include', // si usas cookies de sesión
      });
      const data = await res.json();

      if (Array.isArray(data)) {
        setWishlistItems(data);
      } else if (Array.isArray(data.wishlist)) {
        setWishlistItems(data.wishlist);
      } else {
        setWishlistItems([]);
      }
    } catch (err) {
      console.error('Failed to fetch wishlist', err);
      setWishlistItems([]);
    }
  };

  const addToWishlist = async (item: WishlistItem) => {
    try {
      const res =await fetch(`http://localhost:8080/api/wishlist/${item.id}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to add to wishlist');

      await refreshWishlist();
    } catch (err) {
      console.error(err);
    }
  };
const removeFromWishlist = async (itemId: string) => {
  try {
    const res = await fetch(`http://localhost:8080/api/wishlist/${itemId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!res.ok) throw new Error('Failed to remove from wishlist');

    await refreshWishlist();
  } catch (err) {
    console.error(err);
  }
};

  const isInWishlist = (itemId: string) => wishlistItems.some(item => item.id === itemId);

  // Al cargar, traemos la wishlist
  useEffect(() => {
    refreshWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        refreshWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
