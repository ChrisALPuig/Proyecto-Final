# Cart Integration Guide

This guide demonstrates how to set up and use the Cart Context with Cart Popover in your application.

## Overview

The cart system provides:
- ✅ Centralized state management with Context API
- ✅ Persistent cart data using localStorage
- ✅ Real-time cart updates across components
- ✅ Type-safe with full TypeScript support
- ✅ Responsive cart popover (drawer on all devices)
- ✅ Easy integration with any React component

---

## STEP 1: Wrap your app with CartProvider

In `src/App.tsx` or `src/main.tsx`:

```tsx
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <CartProvider>
      {/* Your app routes and components */}
    </CartProvider>
  );
}
```

---

## STEP 2: Updated Header with Cart Context

In `src/components/Header/Header.tsx`:

```tsx
import { useCart } from '../../contexts/CartContext';
import CartPopover from '../carrito/CartPopover';

const Header: React.FC = () => {
  const cart = useCart();
  const [cartPopoverOpen, setCartPopoverOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <IonHeader>
        <IonToolbar className="toolbar">
          {/* ... other header content ... */}

          {/* Cart Icon with Badge */}
          <div className="cart-container" ref={cartRef}>
            <div onClick={() => setCartPopoverOpen(true)} style={{ position: 'relative', cursor: 'pointer' }}>
              <ShoppingCart className="icon" />
              {cart.cartCount > 0 && (
                <span className="cart-badge">{cart.cartCount}</span>
              )}
            </div>
          </div>

          {/* ... rest of header ... */}
        </IonToolbar>
      </IonHeader>

      {/* Cart Popover */}
      <CartPopover
        isOpen={cartPopoverOpen}
        onClose={() => setCartPopoverOpen(false)}
        cartItems={cart.cartItems}
        onQuantityChange={cart.updateQuantity}
        onRemoveItem={cart.removeFromCart}
        triggerElement={cartRef}
      />
    </>
  );
};
```

---

## STEP 3: Add Cart Badge Styling to Header.css

Add this to `src/components/Header/Header.css`:

```css
.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  z-index: 10;
  animation: badgePulse 0.3s ease-out;
}

@keyframes badgePulse {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
```

---

## STEP 4: Add to Cart from Product Page

Example in `src/pages/juegos/doom.tsx`:

```tsx
import { useCart } from '../../contexts/CartContext';
import { useHistory } from 'react-router-dom';

const DoomPage: React.FC = () => {
  const { addToCart } = useCart();
  const history = useHistory();

  const product = {
    id: 'doom-2016',
    name: 'Doom (2016)',
    price: 19.99,
    image: '/assets/images/doom.png',
    quantity: 1,
  };

  const handleAddToCart = () => {
    addToCart(product);
    
    // Optional: Show toast notification
    // Toast.show({
    //   message: `${product.name} added to cart!`,
    //   duration: 2000,
    // });
  };

  return (
    <IonContent>
      {/* Product details */}
      <h1>{product.name}</h1>
      <p>€{product.price}</p>
      
      <IonButton onClick={handleAddToCart} expand="block">
        Add to Cart
      </IonButton>

      <IonButton onClick={() => history.push('/carrito-juego')} expand="block">
        View Cart
      </IonButton>
    </IonContent>
  );
};
```

---

## STEP 5: Update ListaCarrito to use Cart Context

In `src/components/carrito/ListaCarrito.tsx`:

```tsx
import { useCart } from '../../contexts/CartContext';

const ListaCarrito = () => {
  const { cartItems, updateQuantity, removeFromCart, getSubtotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <IonContent>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <IonRouterLink routerLink="/home">
            <IonButton>Continue Shopping</IonButton>
          </IonRouterLink>
        </div>
      </IonContent>
    );
  }

  return (
    <IonContent>
      {/* ... existing header ... */}

      <div className="layout-carrito">
        {/* Games List */}
        <div className='caja-juego'>
          <span className='titulo-juego'>{cartItems.length} Item(s) in the cart</span>

          {cartItems.map((item) => (
            <div key={item.id} className='contenido-juego'>
              <img className="imagen-juego" src={item.image} alt={item.name} />

              <div className='informacion-juego'>
                <div className='fila-arriba'>
                  <span className='nombre-juego'>{item.name}</span>
                </div>
                <span className='precio-juego'>€{item.price.toFixed(2)}</span>

                <div className='fila-abajo'>
                  {/* Quantity Selector */}
                  <div className='quantity-controls'>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    className='eliminar-juego'
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="caja-resumen">
          <h2>Order Summary</h2>

          <div className="linea-resumen">
            <span>Subtotal</span>
            <span>€{getSubtotal().toFixed(2)}</span>
          </div>

          <div className="linea-resumen total">
            <span>Total</span>
            <span>€{getSubtotal().toFixed(2)}</span>
          </div>

          <IonRouterLink routerLink="/payment">
            <button className="boton-pago">Continue to Payment</button>
          </IonRouterLink>
        </div>
      </div>

      <IonRouterLink routerLink="/home">
        <button className="boton-home">← Back to shopping</button>
      </IonRouterLink>
    </IonContent>
  );
};
```

---

## STEP 6: Cart Summary for Payment Page

In `src/components/payments/payments.tsx`:

```tsx
import { useCart } from '../../contexts/CartContext';

const Payments: React.FC = () => {
  const { cartItems, getSubtotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const subtotal = getSubtotal();
  const tax = subtotal * 0.19; // Assuming 19% tax
  const total = subtotal + tax;

  return (
    <div className="payment-container">
      {/* Payment Form */}
      <div className="payment-form">
        {/* Add your payment form here */}
      </div>

      {/* Order Summary */}
      <div className="order-summary">
        <h2>Order Summary</h2>

        {cartItems.map((item) => (
          <div key={item.id} className="summary-item">
            <span>{item.name}</span>
            <span>€{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <div className="summary-divider"></div>

        <div className="summary-line">
          <span>Subtotal</span>
          <span>€{subtotal.toFixed(2)}</span>
        </div>

        <div className="summary-line">
          <span>Tax</span>
          <span>€{tax.toFixed(2)}</span>
        </div>

        <div className="summary-line total">
          <span>Total</span>
          <span>€{total.toFixed(2)}</span>
        </div>

        <button className="pay-button">Pay €{total.toFixed(2)}</button>
      </div>
    </div>
  );
};
```

---

## STEP 7: useCart Hook Usage

Use the `useCart` hook in any component:

```tsx
import { useCart } from '../../contexts/CartContext';

const SomeComponent = () => {
  const {
    cartItems,      // Array of CartItem
    cartCount,      // Total number of items
    addToCart,      // Add item function
    removeFromCart, // Remove item function
    updateQuantity, // Update quantity function
    clearCart,      // Clear all items
    getSubtotal,    // Calculate subtotal
  } = useCart();

  // Use any of these functions and values
};
```

---

## Features & Benefits

- **✅ Centralized State Management**: Single source of truth for cart data
- **✅ Persistent Cart**: Cart data saved to localStorage
- **✅ Real-time Updates**: All components see cart changes immediately
- **✅ Type-Safe**: Full TypeScript support with autocomplete
- **✅ Easy Integration**: Simple hook-based API
- **✅ Scalable**: Ready for additional features

---

## Advanced Features (Optional Enhancements)

### 1. Add Discount/Coupon Support
```tsx
// Add to CartContext
const [couponCode, setCouponCode] = useState<string>('');
const [discountAmount, setDiscountAmount] = useState<number>(0);

// Modify getSubtotal()
const getSubtotal = () => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return total - discountAmount;
};
```

### 2. Cart Persistence + Sync
- Upload cart to server for logged-in users
- Sync across multiple devices

### 3. Analytics Tracking
- Track `addToCart`, `removeFromCart`, `checkout` events
- Measure conversion rates

### 4. Wishlist Integration
- Allow moving items between cart and wishlist
- Show "Add to Wishlist" in cart popover

### 5. Bulk Operations
```tsx
const bulkRemove = (itemIds: string[]) => {
  setCartItems(items => items.filter(item => !itemIds.includes(item.id)));
};

const bulkUpdateQuantity = (updates: Record<string, number>) => {
  setCartItems(items => items.map(item => 
    updates[item.id] ? { ...item, quantity: updates[item.id] } : item
  ));
};
```

---

## API Reference

### CartItem Interface
```tsx
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
```

### CartContextType Interface
```tsx
interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
}
```

---

## Troubleshooting

### Cart not persisting after reload
- Check if localStorage is enabled in your browser
- Check browser console for localStorage errors

### Cart not updating in components
- Ensure component is wrapped with `CartProvider`
- Check that `useCart()` is called inside a component that's a child of `CartProvider`

### Cart badge not showing
- Ensure `cartCount` is greater than 0
- Check CSS for `.cart-badge` styles
- Verify cart items are being added correctly

---

**For questions or issues, check the implementation files:**
- `src/contexts/CartContext.tsx` - State management
- `src/components/carrito/CartPopover.tsx` - UI component
- `src/components/Header/Header.tsx` - Integration example
