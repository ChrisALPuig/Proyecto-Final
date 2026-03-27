import { IonImg } from '@ionic/react';
import { useState, useEffect } from 'react';
import { useWishlist } from '../../contexts/useWishlist.ts';

interface FavProps {
  itemId: string;
  itemName?: string;
  itemPrice?: number;
  itemImage?: string;
}

const ImagenToggle: React.FC<FavProps> = ({ itemId, itemName = '', itemPrice = 0, itemImage = '' }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [inWishlist, setInWishlist] = useState(isInWishlist(itemId));

  useEffect(() => {
    setInWishlist(isInWishlist(itemId));
  }, [itemId, isInWishlist]);

  const handleClick = () => {
    if (inWishlist) {
      removeFromWishlist(itemId);
      setInWishlist(false);
    } else {
      addToWishlist({
        id: itemId,
        name: itemName,
        price: itemPrice,
        image: itemImage,
      });
      setInWishlist(true);
    }
  };

  return (
    <IonImg
      src={inWishlist ? '/assets/images/Heart2.png' : '/assets/images/Heart.png'}
      alt="Favorito"
      onClick={handleClick}
      style={{ cursor: 'pointer', width: '30px', height: 'auto', transition: 'transform 0.25s ease' }}
      className="heart-icon"
    />
  );
};

export default ImagenToggle;
