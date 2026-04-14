import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/home/Home.tsx';
import Carrito from './pages/carrito/carrito.tsx';
import carritojuego from './pages/carrito/carrito-juego.tsx';
import payment from './pages/payment/payment.tsx';
import Doom from './pages/juegos/doom.tsx';
import SupportPage from './pages/support/SupportPage.tsx';
import OrderPayments from './pages/support/OrderPayments.tsx';
import SignIn from './pages/auth/SignIn.tsx';
import SignUp from './pages/auth/SignUp.tsx';
import Confirmation from './pages/support/Confirmacion.tsx';
import Success from './pages/payment/success.tsx';
import HowToPay from './pages/support/HowToPay.tsx';
import HowToBuyGif from './pages/support/HowToBuyGif.tsx';
import HowToChangeCurrency from './pages/HowToChangeCurrency.tsx';
/*import HowToRedeemCode from './pages/support/HowToRedeemCode.tsx';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { AuthProvider } from './contexts/AuthContext.tsx';
import Form from './pages/support/FormSupport.tsx';
import Store from './pages/store/store.tsx';
import AccountStoreComponent from './components/support/AccountStoreComponent.tsx';
import Policies_GeneralnfoComponent from './components/support/Policies _GeneralnfoComponent.tsx';
import HowToRedeemCode from './pages/HowToRedeemCode.tsx';




setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path="/doom" component={Doom} />
        <Route exact path="/carrito" component={Carrito} />
        <Route exact path="/carrito-juego" component={carritojuego} />
        <Route exact path="/payment" component={payment} />
        <Route exact path="/support" component={SupportPage} />
        <Route exact path="/orders-payments" component={OrderPayments} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/confirmacion" component={Confirmation} />
        <Route exact path="/success" component={Success} />
        <Route exact path="/howtopay" component={HowToPay} />
        <Route exact path="/howtobuygif" component={HowToBuyGif} />
        <Route exact path="/howtochangecurrency" component={HowToChangeCurrency} />
        <Route exact path="/howtoredeemcode" component={HowToRedeemCode} />
        <Route exact path="/i-tried-to-make-a-payment" component={OrderPayments} />
        <Route exact path="/i-got-charged-and-did-not-get-my-game" component={OrderPayments} />
        <Route exact path="/i-got-charged-but-did-not-order-the-game" component={OrderPayments} />
        <Route exact path="/paid-in-local-currency-but-got-charged-an-additional-fee" component={OrderPayments} />
        <Route exact path="/form" component={Form} /> 
        <Redirect exact from="/" to="/home" />
        <Route exact path="/games" component={Store} />
        <Route exact path="/account-store" component={AccountStoreComponent} />
        <Route exact path="/policies_general" component={Policies_GeneralnfoComponent} />
      </IonRouterOutlet>
      </IonReactRouter>
    </AuthProvider>
  </IonApp>
);

export default App;
