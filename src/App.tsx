import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Pages */
import Home from './pages/home/Home.tsx';
import Carrito from './pages/carrito/carrito.tsx';
import CarritoJuego from './pages/carrito/carrito-juego.tsx';
import Payment from './pages/payment/payment.tsx';
import SupportPage from './pages/support/SupportPage.tsx';
import OrderPayments from './pages/support/OrderPayments.tsx';
import Confirmation from './pages/support/Confirmacion.tsx';
import Success from './pages/payment/success.tsx';
import HowToPay from './pages/support/HowToPay.tsx';
import HowToBuyGif from './pages/support/HowToBuyGif.tsx';
import HowToChangeCurrency from './pages/HowToChangeCurrency.tsx';
import HowToRedeemCode from './pages/HowToRedeemCode.tsx';
import GameDynamicPage from './pages/juegos/GameDynamicPage.tsx';
import MyTickets from './pages/support/MyTickets.tsx';
import OrdersSettingsPage from './pages/support/OrdersSettingsPage.tsx';
import TicketView from './pages/support/TicketView.tsx';
import UserOrders from './pages/orders/UserOrders.tsx';
import UserProfile from './pages/UserProfile.tsx';

/* Auth (AJUSTA RUTAS SI ES NECESARIO) */
import SignIn from './pages/auth/SignIn.tsx';
import SignUp from './pages/auth/SignUp.tsx';
import ResetPassword from './pages/auth/ResetPassword.tsx';
import Doom from './pages/juegos/doom.tsx';

/* Components */
import AccountStoreComponent from './components/support/AccountStoreComponent.tsx';
import PoliciesGeneralInfoComponent from './components/support/Policies_GeneralnfoComponent.tsx';
import Store from './pages/store/store.tsx';
import Form from './pages/support/FormSupport.tsx';

/* Context Providers */
import { AuthProvider } from './contexts/AuthContext.tsx';
import { WishlistProvider } from './contexts/WishlistContext.tsx';
import { CartProvider } from './contexts/useCart.tsx';
import { NotificationProvider } from './contexts/NotificationContext.tsx';
import { LanguageProvider } from './contexts/LanguageContext.tsx';
import { AlertProvider } from './contexts/AlertContext.tsx';
import { ModalProvider } from './contexts/ModalContext.tsx';
import { AlertModalConnector } from './contexts/AlertModalConnector.tsx';

/* Stripe */
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

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

setupIonicReact();

const stripePromise = loadStripe(
  'pk_test_51SQ4n0EJyxBaZfwsZ5SnvsnQVwTfSXhrIzqLbwLlKRkVdTtaqdgn8RFQBH3FTVQzO8dO1dTZD9ggTsGoKJk3FdDv00fL1mnJ6w'
);

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <ModalProvider>
        <AlertProvider>
          <AlertModalConnector />
          <WishlistProvider>
            <CartProvider>
              <LanguageProvider>
                <NotificationProvider>
                  <IonReactRouter>
                    <IonRouterOutlet>

                  {/* HOME */}
                  <Route exact path="/home" component={Home} />
                  <Redirect exact from="/" to="/home" />

                  {/* GAME */}
                  <Route exact path="/game/:gameId" component={GameDynamicPage} />

                  {/* CART */}
                  <Route exact path="/carrito" component={Carrito} />
                  <Route exact path="/carrito-juego" component={CarritoJuego} />

                  {/* PAYMENT */}
                  <Route
                    exact
                    path="/payment"
                    render={() => (
                      <Elements stripe={stripePromise}>
                        <Payment />
                      </Elements>
                    )}
                  />

                  <Route exact path="/success" component={Success} />
                  <Route exact path="/confirmacion" component={Confirmation} />

                  {/* SUPPORT */}
                  <Route exact path="/support" component={SupportPage} />
                  <Route exact path="/orders-payments" component={OrderPayments} />
                  <Route exact path="/my-tickets" component={MyTickets} />
                  <Route exact path="/orders-settings" component={OrdersSettingsPage} />
                  <Route exact path="/user-orders" component={UserOrders} />
                  <Route exact path="/user-profile" component={UserProfile} />
                  <Route path="/ticket/:id" component={TicketView} exact />

                  {/* STORE */}
                  <Route exact path="/games" component={Store} />

                  {/* SUPPORT HELP PAGES */}
                  <Route exact path="/howtopay" component={HowToPay} />
                  <Route exact path="/howtobuygif" component={HowToBuyGif} />
                  <Route exact path="/howtochangecurrency" component={HowToChangeCurrency} />
                  <Route exact path="/howtoredeemcode" component={HowToRedeemCode} />
                  <Route exact path="/form" component={Form} />

                  {/* AUTH */}
                  <Route exact path="/login" component={SignIn} />
                  <Route exact path="/register" component={SignUp} />
                  <Route exact path="/reset-password" component={ResetPassword} />

                  {/* EXTRA */}
                  <Route exact path="/account-store" component={AccountStoreComponent} />
                  <Route exact path="/policies_general" component={PoliciesGeneralInfoComponent} />
                  <Route exact path="/doom" component={Doom} />

                </IonRouterOutlet>
              </IonReactRouter>
            </NotificationProvider>
          </LanguageProvider>
        </CartProvider>
      </WishlistProvider>
    </AlertProvider>
  </ModalProvider>
</AuthProvider>
  </IonApp>
);

export default App;