# Cart Popover Component Documentation

## Overview
The **CartPopover** is a floating cart pop-up component inspired by GOG.com. It displays cart items in a modal that drops down from the cart icon in the header, providing a quick preview of items without navigating away from the current page.

## Features
✅ Responsive design (desktop, tablet, mobile)  
✅ Smooth slide-in animation  
✅ Item quantity selector with +/- buttons  
✅ Remove item functionality  
✅ Real-time subtotal calculation  
✅ Navigation buttons ("View Cart" & "Proceed to Payment")  
✅ Click outside to dismiss  
✅ Ionic components integration  
✅ Keyboard accessible  
✅ Custom scrollbar styling  

## Files Created

### 1. **CartPopover.tsx**
Location: `src/components/carrito/CartPopover.tsx`

The main React component that provides the cart pop-up UI. Includes:
- `CartItem` interface for type safety
- `CartPopoverProps` interface for component props
- Full implementation with Ionic IonPopover

### 2. **CartPopover.css**
Location: `src/components/carrito/CartPopover.css`

Complete styling with:
- Responsive breakpoints (desktop, tablet, mobile)
- Smooth animations (slide-in effect)
- Custom scrollbar styling
- Hover states and transitions
- Proper spacing and typography

### 3. **Updated Header.tsx**
Location: `src/components/Header/Header.tsx`

Modified to:
- Import CartPopover component
- Add cart state management
- Handle quantity changes
- Handle item removal
- Trigger popover on cart icon click

## Component Props

```tsx
interface CartPopoverProps {
  isOpen: boolean;                                    // Controls popover visibility
  onClose: () => void;                              // Callback when popover closes
  cartItems: CartItem[];                            // Array of items in cart
  onQuantityChange: (itemId: string, quantity: number) => void; // Handle quantity updates
  onRemoveItem: (itemId: string) => void;          // Handle item removal
  triggerElement: React.RefObject<HTMLDivElement>; // Reference to trigger element
}

interface CartItem {
  id: string;           // Unique identifier
  name: string;         // Product name
  price: number;        // Product price
  image: string;        // Product image URL
  quantity: number;     // Product quantity
}
```

## Usage Example

```tsx
import CartPopover, { CartItem } from "./components/carrito/CartPopover";

const MyComponent = () => {
  const cartRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setCartItems(
      cartItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  return (
    <>
      <div ref={cartRef} onClick={() => setIsOpen(true)}>
        Cart Icon
      </div>

      <CartPopover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        cartItems={cartItems}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={handleRemoveItem}
        triggerElement={cartRef}
      />
    </>
  );
};
```

## Integration with Cart Context (Recommended)

For a production app, integrate with a cart context:

```tsx
// contexts/CartContext.tsx
import React, { createContext, useContext, useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
```

### Use in Header:
```tsx
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [cartPopoverOpen, setCartPopoverOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={cartRef} onClick={() => setCartPopoverOpen(true)}>
        {/* Cart icon */}
      </div>

      <CartPopover
        isOpen={cartPopoverOpen}
        onClose={() => setCartPopoverOpen(false)}
        cartItems={cartItems}
        onQuantityChange={updateQuantity}
        onRemoveItem={removeFromCart}
        triggerElement={cartRef}
      />
    </>
  );
};
```

## Styling Customization

### Modify CSS Variables in CartPopover.css:
```css
.cart-popover {
  --width: 380px;           /* Popover width */
  --height: auto;           /* Popover height */
  --max-height: 600px;      /* Maximum height */
  --border-radius: 12px;    /* Corner radius */
  --box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15); /* Shadow effect */
  --background: #ffffff;    /* Background color */
}
```

### Color Customization:
- **Primary Button**: `.cart-btn-primary` (currently dark)
- **Secondary Button**: `.cart-btn-secondary` (currently light)
- **Price Color**: `.cart-item-price` (currently green #2ecc71)
- **Remove Button Hover**: `.cart-item-remove:hover` (currently light red)

### Responsive Breakpoints:
- Desktop: 768px+ (default)
- Tablet: 481px - 768px
- Mobile: 480px and below

## Animation Customization

The component uses a `slideInDown` animation. Modify in CartPopover.css:

```css
@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);  /* Adjust distance */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Change animation duration in `.cart-popover-container`:
```css
.cart-popover-container {
  animation: slideInDown 0.3s ease-out; /* Adjust timing */
}
```

## Responsive Behavior

### Desktop (768px+)
- Width: 380px
- Position: Top-right corner
- Max height: 600px
- Full labels and features

### Tablet (481px - 768px)
- Width: 100%
- Slightly smaller padding
- Adjusted font sizes
- Same features

### Mobile (480px and below)
- Width: 100% (full screen)
- Bottom sheet style (border-radius adjustment for top corners only)
- Reduced padding and font sizes
- Optimized touch targets
- Max height: 80vh

## Keyboard Navigation

The component supports:
- **Tab**: Navigate through buttons and interactive elements
- **Enter/Space**: Activate buttons
- **Esc**: Close popover (handled by IonPopover)

## Accessibility Features

✅ Proper semantic HTML  
✅ ARIA labels on buttons  
✅ Color contrast compliance  
✅ Disabled state for quantity decrease when quantity is 1  
✅ Proper focus management  
✅ Keyboard navigation support  

## Troubleshooting

### Popover not showing?
- Ensure `isOpen` prop is set to `true`
- Check that `onClose` is properly updating state
- Verify `triggerElement` ref is correctly attached

### Items not updating?
- Ensure `onQuantityChange` and `onRemoveItem` handlers are properly implemented
- Check that state is being passed as `cartItems` prop

### Styling issues?
- Clear cache: `npm run dev`
- Check CSS specificity - IonPopover may require higher specificity selectors
- Verify CartPopover.css is imported in CartPopover.tsx

### Navigation not working?
- Ensure `/carrito-juego` and `/payment` routes exist
- Check that `useHistory` is available in parent context
- Verify router configuration in App.tsx

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

For large cart lists (50+ items):
1. Use virtual scrolling in the items container
2. Memoize CartPopover with `React.memo`
3. Consider pagination for items

## Future Enhancements

Potential improvements:
- [ ] Cart item animations (fade in/out on add/remove)
- [ ] Drag-to-reorder items
- [ ] Save cart to localStorage
- [ ] Gift card support
- [ ] Coupon code input
- [ ] Estimated shipping display
- [ ] Cart sharing feature
- [ ] Analytics tracking

## License & Support

This component is part of your project. For issues or improvements:
1. Check the responsive breakpoints for your device
2. Verify all imports are correctly linked
3. Ensure Ionic dependencies are installed
4. Test in different browsers

---

**Last Updated**: February 22, 2026  
**Version**: 1.0  
**Author**: Your Development Team
