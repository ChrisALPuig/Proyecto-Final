import { IonContent, IonImg, IonRouterLink } from '@ionic/react';
import ImagenToggle from './fav.tsx';
import './ListaCarrito.css';

const ListaCarrito = () => {
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
      <span className='titulo-juego'>1 Item in the cart</span>

      <div className='contenido-juego'>
        <img className="imagen-juego" src="/assets/images/doom.png" />

        <div className='informacion-juego'>
          <div className='fila-arriba'>
            <span className='nombre-juego'>Doom (2016)</span>
          </div>
          <span className='precio-juego'>19.99€</span>

          <div className='fila-abajo'>
            <ImagenToggle 
              itemId="doom-2016"
              itemName="Doom (2016)"
              itemPrice={19.99}
              itemImage="/assets/images/doom.png"
            />
            <IonRouterLink routerLink='/carrito'>
              <IonImg className='eliminar-juego' src="/assets/images/eliminar.png" />
            </IonRouterLink>
          </div>
        </div>
      </div>
    </div>

    {/* CAJA DERECHA (RESUMEN) */}
    <div className="caja-resumen">
      <h2>Order Summary</h2>

      <div className="linea-resumen">
        <span>Subtotal</span>
        <span>19.99€</span>
      </div>

      <div className="linea-resumen total">
        <span>Total</span>
        <span>19.99€</span>
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