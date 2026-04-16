import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const CgVoluntaryRefundPolicyComponent: React.FC = () => {
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles"> CG Voluntary Refund Policy </h1>
        <div className="divider"></div>

        {/* CONTENEDOR DE RESPUESTA */}
        <div className="how-to-buy-container">
          <p className="how-to-buy-text">
            By default, if you have a retail code or one purchased from an authorized platform, you’ll need to visit the redeem page.

            <p>Once there, enter the code, check the “I’m not a robot” box, and click “Continue.” If everything is correct, the game details will appear, and the game(s) will be added to your account after clicking “Continue” again. Keep in mind that once the code is opened, it will be temporarily reserved for you for a few minutes. If you want to make it available for someone else, click “Cancel.”</p>
            
            <p>If the code doesn’t work, make sure it has been entered correctly.</p>

            <p>If you bought the code from an unauthorized key reseller, there’s a chance it may have been blocked or already used by another person.</p>
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

export default CgVoluntaryRefundPolicyComponent;