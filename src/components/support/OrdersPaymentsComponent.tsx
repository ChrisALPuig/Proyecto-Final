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
              
              <tr><td><img src="/public/start.png" alt="star" className="orders-table-images"/>{t("howDoIBuyAGift")}</td></tr>
              <tr><td><img src="/public/start.png" alt="star" className="orders-table-images"/>{t("howCanIChangeCurrency")}</td></tr>
              <tr><td><img src="/public/start.png" alt="star" className="orders-table-images"/>{t("howDoIRedeemCode")}</td></tr>
            </tbody>
          </table>

          {/* DERECHA */}
          <table className="orders-table">
            <tbody>
              <tr><td><img src="/public/start.png" alt="star" className="orders-table-images"/>{t("paymentDidNotWork")}</td></tr>
              <tr><td><img src="/public/start.png" alt="star" className="orders-table-images"/>{t("chargedNoGame")}</td></tr>
              <tr><td>{t("chargedNotDelivered")}</td></tr>
              <tr><td>{t("paidLocalCurrencyFee")}</td></tr>
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