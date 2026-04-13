import { IonPopover, IonButton, IonIcon } from "@ionic/react";
import { close, add, remove } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useCart } from "../../contexts/useCart.tsx";
import "./CartPopover.css";

interface CartPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  triggerElement?: React.RefObject<HTMLDivElement | null>;
}

const CartPopover: React.FC<CartPopoverProps> = ({ isOpen, onClose }) => {
  const history = useHistory();
  const { cartItems, updateQuantity, removeFromCart, getSubtotal } = useCart();

  const subtotal = getSubtotal();

  const handleViewCart = () => {
    onClose();
    history.push("/carrito-juego");
  };

  const handleProceedPayment = () => {
    onClose();
    history.push("/payment");
  };

  return (
    <IonPopover
      isOpen={isOpen}
      onDidDismiss={onClose}
      side="end"
      alignment="end"
      showBackdrop={true}
      translucent={false}
      className="cart-popover"
    >
      <div className="cart-popover-container">
        {/* Header */}
        <div className="cart-popover-header">
          <h2>Your Cart</h2>
          <button className="cart-popover-close" onClick={onClose}>
            <IonIcon icon={close} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="cart-popover-items">
          {cartItems.length === 0 ? (
            <div className="cart-popover-empty">Your cart is empty</div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-popover-item">
                {/* Product Image */}
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                {/* Product Details */}
                <div className="cart-item-details">
                  <div className="cart-item-header">
                    <h3>{item.name}</h3>
                    <button
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <IonIcon icon={close} />
                    </button>
                  </div>

                  <p className="cart-item-price">€{item.price.toFixed(2)}</p>

                  {/* Quantity Selector */}
                  <div className="cart-item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      <IonIcon icon={remove} />
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <IonIcon icon={add} />
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="cart-item-total">
                  €{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-popover-footer">
            <div className="cart-popover-subtotal">
              <span>Subtotal:</span>
              <span className="subtotal-amount">€{subtotal.toFixed(2)}</span>
            </div>
            <IonButton
              expand="block"
              color="light"
              className="cart-btn-secondary"
              onClick={handleViewCart}
            >
              View Cart
            </IonButton>
            <IonButton
              expand="block"
              color="dark"
              className="cart-btn-primary"
              onClick={handleProceedPayment}
            >
              Proceed to Payment
            </IonButton>
          </div>
        )}
      </div>
    </IonPopover>
  );
};

export default CartPopover;