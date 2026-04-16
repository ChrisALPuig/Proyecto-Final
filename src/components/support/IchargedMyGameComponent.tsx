import { IonPage, IonRouterLink } from "@ionic/react";
import "./HowToPayComponente.css";
import SupportHeader from "./SupportHeader.tsx";

const IchargedMyGameComponent: React.FC = () => {
  return (
    <>
      <SupportHeader />
      <div className="orders-content">
        <h1 className="orders-titles"> I got charged and did not get my game </h1>
        <div className="divider"></div>
        <div className="how-to-buy-container">
          <p className="how-to-buy-text">
            Keep in mind that banks may place a temporary hold on funds before a transaction goes through, which can make it seem like you’ve been charged when you actually haven’t. Be sure to verify whether the payment was truly completed.</p>

            <p>If, after two hours, your order still appears incomplete and you can’t access the games you purchased—even though the payment was successful—please contact us directly so we can help resolve the issue.</p>

            <p>If you bought a DLC or expansion, note that these don’t show up as separate items in your library. To download a DLC:</p>

            <p>-select the base game in GOG GALAXY
            <p>-click the customization icon (next to PLAY)</p>
            <p>-go to “Manage installation”</p>
            <p></p>-then “Configure”</p>
            <p>-choose the DLC and confirm with OK</p>

            <p>If you prefer to install DLCs without using the app:</p>
            <p>Open a browser and go to your GOG account library (https://www.gog.com/account
            ). Select the base game, click “DOWNLOAD OFFLINE BACKUP GAME INSTALLERS,” scroll down to “DLC installers,” and download the appropriate setup file.</p>
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

export default IchargedMyGameComponent;
