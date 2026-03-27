import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/home/Home.tsx';
import Carrito from './pages/carrito/carrito.tsx';
import carritojuego from './pages/carrito/carrito-juego.tsx';
import Payment from './pages/payment/payment.tsx';
import SupportPage from './pages/support/SupportPage.tsx';
import OrderPayments from './pages/support/OrderPayments.tsx';
import SignIn from './pages/auth/SignIn.tsx';
import SignUp from './pages/auth/SignUp.tsx';
import Confirmation from './pages/support/Confirmacion.tsx';
import Success from './pages/payment/success.tsx';
import HowToPay from './pages/support/HowToPay.tsx';
import Form from './pages/support/FormSupport.tsx';
import GameDynamicPage from './pages/juegos/GameDynamicPage.tsx';

/* Ionic CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

/* Context Providers */
import { AuthProvider } from './contexts/AuthContext.tsx';
import { WishlistProvider } from './contexts/WishlistContext.tsx';
import { CartProvider } from './contexts/useCart.tsx';

/* Stripe */
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

/* Clave pública de Stripe */
const stripePromise = loadStripe('pk_test_51SQ4n0EJyxBaZfwsZ5SnvsnQVwTfSXhrIzqLbwLlKRkVdTtaqdgn8RFQBH3FTVQzO8dO1dTZD9ggTsGoKJk3FdDv00fL1mnJ6w');

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/home" component={Home} />
              <Route exact path="/game/:gameId" component={GameDynamicPage} />
              <Route exact path="/carrito" component={Carrito} />
              <Route exact path="/carrito-juego" component={carritojuego} />

              {/* 🔥 Ruta de Stripe envuelta en Elements */}
              <Route exact path="/payment" render={() => (
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              )} />

              <Route exact path="/support" component={SupportPage} />
              <Route exact path="/orders-payments" component={OrderPayments} />
              <Route exact path="/login" component={SignIn} />
              <Route exact path="/register" component={SignUp} />
              <Route exact path="/confirmacion" component={Confirmation} />
              <Route exact path="/success" component={Success} />
              <Route exact path="/howtopay" component={HowToPay} />
              <Route exact path="/form" component={Form} />
              <Redirect exact from="/" to="/home" />
            </IonRouterOutlet>
          </IonReactRouter>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  </IonApp>
);

export default App;