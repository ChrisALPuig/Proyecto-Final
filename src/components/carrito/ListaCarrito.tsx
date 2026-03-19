import { IonContent, IonImg, IonRouterLink } from '@ionic/react';
import ImagenToggle from './fav.tsx';
import { useCart } from '../../contexts/useCart.tsx';
import './ListaCarrito.css';

const ListaCarrito = () => {
  const { cartItems, removeFromCart } = useCart();

  // Calcula el subtotal sumando precio * cantidad de cada item
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <IonContent>

      {/* PASOS */}
      <div className="lista-carrito">
        <div className="item-carrito">
          <div className="circulo">1</div>
          <span className="texto-carrito">Your Cart</span>
          <div className="circulo2">2</div>
          <span className="texto-carrito2">Payment</span>
        </div>
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="layout-carrito">

        {/* CAJA IZQUIERDA (JUEGOS) */}
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

        {/* CAJA DERECHA (RESUMEN) */}
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

          <IonRouterLink routerLink="/payment">
            <button className="boton-pago">Continue to Payment</button>
          </IonRouterLink>
        </div>

      </div>

      {/* BOTÓN VOLVER HOME */}
      <IonRouterLink routerLink="/home">
        <button className="boton-home">← Back to shopping</button>
      </IonRouterLink>

    </IonContent>
  );
};

export default ListaCarrito;