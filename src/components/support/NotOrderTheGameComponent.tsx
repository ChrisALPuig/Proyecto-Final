import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const NotOrderTheGameComponent: React.FC = () => {
  return (
    <>
      <SupportHeader />
      <div className="orders-content">
        <h1 className="orders-titles"> I got charged but did not order the game </h1>
        <div className="divider"></div>
        <div className="how-to-buy-container">
          <p className="how-to-buy-text">
            If you think you were charged for a game you didn’t mean to buy, please contact us directly so we can look into the situation and clarify what happened.</p>

            <p>If you got an order confirmation email for Fahrenheit: Indigo Prophecy Remastered but didn’t actually purchase it, you can safely disregard it. The game was automatically granted for free to all owners of the original Fahrenheit, and those confirmation emails were sent due to a technical error. We apologize for any confusion caused.
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
            <p>If you were unable to find the answers you were looking for, please reach out and someone from our friendly and knowledgeable support team will be happy to help with their top-notch assistance! We know you want to get back to gaming, so we strive to answer all messages within 24 hours.</p>
          </div>
          <div className="button-contact-uno">
            <IonRouterLink routerLink="/form">
              <button className="button-contact">CONTACT US</button>
            </IonRouterLink>
          </div>
        </div>
        <br />
      </div>
    </>
  );
};

export default NotOrderTheGameComponent;
