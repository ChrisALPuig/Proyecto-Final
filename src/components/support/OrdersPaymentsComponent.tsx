import { IonRouterLink } from "@ionic/react";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import "./OrdersPaymentsComponent.css"; // <-- nuevo CSS
import SupportHeader from "./SupportHeader.tsx";

const OrdersPayments: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>

      {/* HEADER FIJO */}
      <SupportHeader />

      {/* CONTENIDO BLANCO */}
      <div className="orders-content">
        <h1 className="orders-titles">{t("ordersPayments")}</h1>
        <p className="orders-description">{t("ordersDescription")}</p>
        <div className="divider"></div>

        {/* TABLAS */}
        <div className="tables-container">
          {/* IZQUIERDA */}
          <table className="orders-table">
            <tbody>
              
              <tr><td><IonRouterLink routerLink="/howtopay" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>{t("howDoIBuyAGame")}</IonRouterLink></td></tr>
              
              <tr><td><IonRouterLink routerLink="/howtobuygif" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>How do I buy a gif?</IonRouterLink></td></tr>
              <tr><td><IonRouterLink routerLink="/howtochangecurrency" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>How can I change my currency?</IonRouterLink></td></tr>
              <tr><td><IonRouterLink routerLink="/howtoredeemcode" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>How do I redeem a code?</IonRouterLink></td></tr>
            </tbody>
          </table>

          {/* DERECHA */}
          <table className="orders-table">
            <tbody>
              <tr><td><IonRouterLink routerLink="/i-tried-to-make-a-payment" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>I tried to make a payment and 
              it didn’t work</IonRouterLink></td></tr>
              <tr><td> <IonRouterLink routerLink="/i-got-charged-and-did-not-get-my-game" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>I got charged and did not get 
              my game</IonRouterLink></td></tr>
              <tr><td><IonRouterLink routerLink="/i-got-charged-but-did-not-order-the-game" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>I got charged but did not order 
              the game</IonRouterLink></td></tr>
              <tr><td><IonRouterLink routerLink="/paid-in-local-currency-but-got-charged-an-additional-fee" className="table-link"><img src="/public/start.png" alt="star" className="orders-table-images"/>Paid in local currency, but got
              charged an additional fee</IonRouterLink></td></tr>
            </tbody>
          </table>
        </div>

        <h1 className="more-questions">{t("moreQuestions")}</h1>
        <div className="more-questions-box">
        <div className="more-questions-box-image">
        <img src="/public/communication.png" alt="" />
        </div>
        <div className="more-questions-box-title">
        <h5>{t("didntFindAnswer")}</h5>
        </div>
        <div className="more-questions-box-p">
        <p>{t("moreQuestionsText")}</p>
        </div>
        <div className="button-contact-uno">
          <IonRouterLink routerLink="/form">
          <button className="button-contact">{t("contactUs")}</button>
          </IonRouterLink>
        </div>
        </div>
        <br></br>
      </div>

    </>
  );
};

export default OrdersPayments;