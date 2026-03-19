import { IonPopover, IonButton, IonIcon } from "@ionic/react";
import { close, cart } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useWishlist } from "../../contexts/useWishlist.ts";
import { useCart } from "../../contexts/useCart.tsx";
import "./WishlistPopover.css";

interface WishlistPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  triggerElement?: React.RefObject<HTMLDivElement | null>;
}

const WishlistPopover: React.FC<WishlistPopoverProps> = ({ isOpen, onClose }) => {
  const history = useHistory();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

 const handleRemove = async (itemId: string) => {
  await removeFromWishlist(itemId);
};

const handleAddToCart = async (itemId: string) => {
  const item = wishlistItems.find(i => i.id === itemId);
  if (item) {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    await removeFromWishlist(itemId);
  }
};

  return (
    <IonPopover
      isOpen={isOpen}
      onDidDismiss={onClose}
      side="end"
      alignment="end"
      showBackdrop={true}
      translucent={false}
      className="wishlist-popover"
    >
      <div className="wishlist-popover-container">
        {/* Header */}
        <div className="wishlist-popover-header">
          <h2>Wishlist</h2>
          <button className="wishlist-popover-close" onClick={onClose}>
            <IonIcon icon={close} />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="wishlist-popover-items">
          {wishlistItems.length === 0 ? (
            <div className="wishlist-popover-empty">
              <p>Your wishlist is empty</p>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-popover-item">
                {/* Product Image */}
                <div className="wishlist-item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                {/* Product Details */}
                <div className="wishlist-item-details">
                  <div className="wishlist-item-header">
                    <h3>{item.name}</h3>
                    <button
                      className="wishlist-item-remove"
                      onClick={() => handleRemove(item.id)}
                      title="Remove from wishlist"
                    >
                      <IonIcon icon={close} />
                    </button>
                  </div>

                  <p className="wishlist-item-price">€{item.price.toFixed(2)}</p>

                  {/* Add to Cart Button */}
                  <button
                    className="wishlist-add-to-cart-btn"
                    onClick={() => handleAddToCart(item.id)}
                  >
                    <IonIcon icon={cart} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </IonPopover>
  );
};

export default WishlistPopover;
