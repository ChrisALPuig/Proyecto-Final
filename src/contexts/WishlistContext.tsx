import React, { createContext, useState, ReactNode } from 'react';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface WishlistContextType {
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (itemId: string) => void;
  isInWishlist: (itemId: string) => boolean;
  clearWishlist: () => void;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const wishlistCount = wishlistItems.length;

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (!existingItem) {
        return [...prevItems, item];
      }
      
      return prevItems;
    });
  };

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== itemId);
      return updatedItems;
    });
  };

  const isInWishlist = (itemId: string): boolean => {
    return wishlistItems.some(item => item.id === itemId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const value: WishlistContextType = {
    wishlistItems,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
