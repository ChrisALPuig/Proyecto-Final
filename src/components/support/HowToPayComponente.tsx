import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css"; // <-- nuevo CSS
import SupportHeader from "./SupportHeader.tsx";

const HowToPay: React.FC = () => {
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles">How do I buy a game?</h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
          <p className="how-to-buy-text">
            It's super-easy. First, you need to add the game to your cart. You can do it in two places:  
          </p>
          <p className="how-to-buy-text2">
            - the catalog page, by clicking on the game's price, or
          </p>
          <p className="how-to-buy-text">
            - the product page (like this one), by clicking on the "Add to Cart" button.
          </p>
            <p className="how-to-buy-text">
            Once you've got one or more items in your Cart, click on the Cart icon in the upper-right corner of the screen, and select "Checkout Now". You can also do this from the product page (where the "Add to Cart" button will be replaced by "Checkout Now").
            Once in Checkout, you will have to select your payment method (credit card, PayPal etc.) and, after all data is entered, click on "Pay for your order now".
          </p>
            <div className="how-to-buy-gif-container">
            <img src="/game_buy.gif" alt="How to buy tutorial" className="how-to-buy-gif"/>
        </div>
        </div>

        <h1 className="more-questions">Do you have more questions?</h1>
        <div className="more-questions-box">
        <div className="more-questions-box-image">
        <img src="/public/communication.png" alt="" />
        </div>
        <div className="more-questions-box-title">
        <h5>Didn't find the answer you were looking for?</h5>
        </div>
        <div className="more-questions-box-p">
        <p>If you were unable to find the answers you were  looking for, please reach out and 
          someone from our  friendly and knowledgeable support team will be  happy to help with 
          their top-notch assistance! We know you want to get back to gaming, so we strive  to answer all messages within 24 hours.
        </p>
        </div>
        <div className="button-contact-uno">
          <IonRouterLink routerLink="/form">
          <button className="button-contact">CONTACT US</button>
          </IonRouterLink>
        </div>
        </div>
        <br></br>
      </div>

    </>
  );
};

export default HowToPay;
