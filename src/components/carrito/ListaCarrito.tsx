import { IonContent, IonImg } from '@ionic/react';
import ImagenToggle from './fav.tsx';
import { useCart } from '../../contexts/useCart.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useHistory } from 'react-router';
import './ListaCarrito.css';

const ListaCarrito = () => {
  const { cartItems, removeFromCart } = useCart();
  const { token, isAuthenticated } = useAuth();
  const history = useHistory();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const generateOrderId = () => {
    if (crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'ORDER-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleProceedToPayment = async () => {
    if (cartItems.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    if (!isAuthenticated || !token) {
      alert('Debes iniciar sesión para continuar con el pago.');
      history.push('/login');
      return;
    }

    const orderId = generateOrderId();

    try {
      // Calcular monto total del carrito
      const totalAmount = Number(cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2));
      
      // Crear nombre del producto (si es 1, el nombre; si son varios, indicar múltiples)
      const productName = cartItems.length === 1 ? cartItems[0].name : `${cartItems.length} items`;
      
      // Tomar la primera imagen para la tarjeta (o combinar)
      const gameImage = cartItems.length > 0 ? cartItems[0].image : null;

      const items = cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: Number(item.price.toFixed(2)),
        quantity: item.quantity,
        image: item.image,
      }));

      // Crear UN SOLO Payment consolidado
      const payload = {
        orderId,
        productName,
        amount: totalAmount,
        gameImage,
        items,
      };

      const res = await fetch('http://localhost:8080/api/orders/continue-to-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.status !== 'success') {
        alert(`Error creando el pago: ${data.message || data.status}`);
        return;
      }

      // Guardar paymentId y orderId en localStorage
      localStorage.setItem('paymentId', data.paymentId);
      localStorage.setItem('orderId', orderId);

      // Redirigir a la página de pago
      history.push('/payment');
    } catch (err) {
      console.error('Error creando el pago:', err);
      alert('Error creando el pago. Intenta nuevamente.');
    }
  };

  return (
    <IonContent>
      <div className="lista-carrito-page">
        <div className="lista-carrito">
          <div className="item-carrito">
            <div className="circulo">1</div>
            <span className="texto-carrito">Your Cart</span>
          <div className="circulo2">2</div>
          <span className="texto-carrito2">Payment</span>
        </div>
      </div>

      <div className="layout-carrito">
        <div className='caja-juego'>
          <span className='titulo-juego'>
            {cartItems.length} Item{cartItems.length !== 1 ? 's' : ''} in the cart
          </span>

          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className='contenido-juego'>
                <img className="imagen-juego" src={item.image} alt={item.name} />

                <div className='informacion-juego'>
                  <div className='fila-arriba'>
                    <span className='nombre-juego'>{item.name}</span>
                  </div>
                  <span className='precio-juego'>{item.price.toFixed(2)}€</span>

                  <div className='fila-abajo'>
                    <ImagenToggle 
                      itemId={item.id}
                      itemName={item.name}
                      itemPrice={item.price}
                      itemImage={item.image}
                    />
                    <IonImg
                      className='eliminar-juego'
                      src="/assets/images/eliminar.png"
                      onClick={() => removeFromCart(item.id)}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="caja-resumen">
          <h2>Order Summary</h2>

          <div className="linea-resumen">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)}€</span>
          </div>

          <div className="linea-resumen total">
            <span>Total</span>
            <span>{subtotal.toFixed(2)}€</span>
          </div>

          <button className="boton-pago" onClick={handleProceedToPayment}>
            Continue to Payment
          </button>
        </div>
      </div>

      <button
        className="boton-home"
        onClick={() => history.push('/home')}
        type="button"
      >
        <span className="boton-home-arrow">←</span>
        Back to home
      </button>
      </div>
    </IonContent>
  );
};

export default ListaCarrito;