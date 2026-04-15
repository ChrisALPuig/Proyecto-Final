import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/home/Home.tsx';
import Carrito from './pages/carrito/carrito.tsx';
import carritojuego from './pages/carrito/carrito-juego.tsx';
import Payment from './pages/payment/payment.tsx';
import SupportPage from './pages/support/SupportPage.tsx';
import OrderPayments from './pages/support/OrderPayments.tsx';
import Confirmation from './pages/support/Confirmacion.tsx';
import Success from './pages/payment/success.tsx';
import HowToPay from './pages/support/HowToPay.tsx';
import Form from './pages/support/FormSupport.tsx';
import GameDynamicPage from './pages/juegos/GameDynamicPage.tsx';
import MyTickets from './pages/support/MyTickets.tsx';
import OrdersSettingsPage from './pages/support/OrdersSettingsPage.tsx';
import UserOrders from './pages/orders/UserOrders';

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
import { NotificationProvider } from './contexts/NotificationContext.tsx';
import { LanguageProvider } from './contexts/LanguageContext.tsx';

/* Stripe */
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import TicketView from './pages/support/TicketView.tsx';

/* Clave pública de Stripe */
const stripePromise = loadStripe('pk_test_51SQ4n0EJyxBaZfwsZ5SnvsnQVwTfSXhrIzqLbwLlKRkVdTtaqdgn8RFQBH3FTVQzO8dO1dTZD9ggTsGoKJk3FdDv00fL1mnJ6w');

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <LanguageProvider>
            <NotificationProvider>
              <IonReactRouter>
            <IonRouterOutlet>
              <Route
                exact
                path="/home"
                render={(props) => (
                  <Home initialAuthMode={(props.location.state as any)?.authMode || null} />
                )}
              />
              <Route exact path="/game/:gameId" component={GameDynamicPage} />
              <Route exact path="/carrito" component={Carrito} />
              <Route exact path="/carrito-juego" component={carritojuego} />
              <Route path="/ticket/:id" component={TicketView} exact />

              {/* 🔥 Ruta de Stripe envuelta en Elements */}
              <Route exact path="/payment" render={() => (
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              )} />

              <Route exact path="/support" component={SupportPage} />
              <Route exact path="/my-tickets" component={MyTickets} />
              <Route exact path="/orders-payments" component={OrderPayments} />
              <Route exact path="/orders-settings" component={OrdersSettingsPage} />
              <Route exact path="/user-orders" component={UserOrders} />
              <Route
                exact
                path="/login"
                render={() => <Home initialAuthMode="login" />}
              />
              <Route
                exact
                path="/register"
                render={() => <Home initialAuthMode="register" />}
              />
              <Route exact path="/confirmacion" component={Confirmation} />
              <Route exact path="/success" component={Success} />
              <Route exact path="/howtopay" component={HowToPay} />
              <Route exact path="/form" component={Form} />
              <Redirect exact from="/" to="/home" />
            </IonRouterOutlet>
              </IonReactRouter>
            </NotificationProvider>
          </LanguageProvider>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  </IonApp>
);

export default App;
