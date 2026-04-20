import { IonPage } from "@ionic/react";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import SupportHeader from "./SupportHeader.tsx";
import "./Support.css";

const Support: React.FC = () => {
  const { t } = useLanguage();

  return (
    <IonPage>
      <SupportHeader />

      <div className="support-content">
        <div className="support-grid">
          {/* IZQUIERDA */}
          <div className="support-item">
            <img
              src="/1.png"
              alt="ORDERS_PAYMENTS"
              className="support-img"
              onClick={() => (window.location.href = "/orders-payments")}
            />
            <h5>{t("supportCard1")}</h5>
            <p>{t("supportCard1Text")}</p>
          </div>

          {/* CENTRO */}
          <div className="support-item">
            <img
              src="/2.png"
              alt="ACCOUNT_STORE"
              className="support-img"
              onClick={() => (window.location.href = "/account-store")}
            />
            <h5>{t("supportCard2")}</h5>
            <p>{t("supportCard2Text")}</p>
          </div>

          {/* DERECHA */}
          <div className="support-item">
            <img
              src="/3.png"
              alt="POLICIES_GENERAL_INFO"
              className="support-img"
              onClick={() => (window.location.href = "/policies_general")}
            />
            <h5>{t("supportCard3")}</h5>
            <p>{t("supportCard3Text")}</p>
          </div>
        </div>

        <h1 className="popular-topics">
          {t("popularSupportTopics")}
        </h1>

        <div className="support-topics">
          <ul>
            <li>{t("howDoIBuyAGame")}</li>
            <li>{t("howDoIBuyAGift")}</li>
            <li>{t("howCanIChangeCurrency")}</li>
            <li>{t("howDoIRedeemCode")}</li>
            <li>{t("paymentQuestion")}</li>
            <li>{t("chargedNotDelivered")}</li>
            <li>{t("cantLogIn")}</li>
            <li>{t("resetPassword")}</li>
            <li>{t("downloadPurchased")}</li>
            <li>{t("installDLC")}</li>
            <li>{t("unableDownload")}</li>
            <li>{t("removeIntegration")}</li>
          </ul>
        </div>
      </div>
    </IonPage>
  );
};

export default Support;