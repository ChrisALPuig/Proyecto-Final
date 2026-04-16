import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const TriedToMakePaymentComponent: React.FC = () => {
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles"> I tried to make a payment and it didn't work. What can I do now? </h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
          <p className="how-to-buy-text">
            <p>Although we strive to make our payment systems as reliable as possible, there are situations beyond our control that may cause a payment to fail.</p>

            <p>If you haven’t received confirmation that the money was taken from your account, you should try making the payment again. It’s possible that there was an error when entering your card details.</p>

            <p>If you’re certain your payment information was correct, your bank may have declined the transaction for some reason. Keep in mind that we operate from Europe, so your card must allow international payments (for example, many prepaid cards issued in the United States do not support them).</p>

            <p>You may need to contact your bank for further assistance, as most payment-related issues are outside our control. If your bank confirms that everything is fine on their side or that they don’t see any payment attempts from us (“GOG.COM” or “GOG Ltd”), please reach out to us through the support form.</p>

            <p>Most importantly, if it appears that you were charged but didn’t receive your game, contact us right away.</p>

            <p>Also remember that banks often place temporary holds on funds before completing a transaction, which can be mistaken for an actual charge. Be sure to verify whether the payment was truly processed.</p>
          </p>
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

export default TriedToMakePaymentComponent;
