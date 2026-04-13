import { IonPage, IonRouterLink } from "@ionic/react";
import "./OrdersPaymentsComponent.css"; // <-- nuevo CSS
import SupportHeader from "./SupportHeader.tsx";

const Policies_GeneralnfoComponent: React.FC = () => {
  
  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles">Policies & General Info</h1>
        <p className="orders-description">Here you can read our policies, or learn more about our service.</p>
        <div className="divider"></div>

        {/* TABLAS */}
        <div className="tables-container">
          {/* IZQUIERDA */}
          <table className="orders-table">
            <tbody>
              
              <tr><td><IonRouterLink routerLink="/howtopay" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>How do I buy a game?</IonRouterLink></td></tr>
              
              <tr><td><img src="/public/start.png" alt="star" className="orders-table-images"/>How do I buy a gif?</td></tr>
              <tr><td><img src="/public/start.png" alt="star" className="orders-table-images"/>How can I change my currency?</td></tr>
              <tr><td><img src="/public/start.png" alt="star" className="orders-table-images"/>How do I redeem a code?</td></tr>
            </tbody>
          </table>

          {/* DERECHA */}
          <table className="orders-table">
            <tbody>
              <tr><td><img src="/public/start.png" alt="star" className="orders-table-images"/>I tried to make a payment and 
              it didn’t work</td></tr>
              <tr><td><img src="/public/start.png" alt="star" className="orders-table-images"/>I got charged and did not get 
              my game</td></tr>
              <tr><td>I got charged but did not order 
              the game</td></tr>
              <tr><td>Paid in local currency, but got
              charged an additional fee</td></tr>
            </tbody>
          </table>
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

export default Policies_GeneralnfoComponent;