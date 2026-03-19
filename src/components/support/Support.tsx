import { IonPage } from "@ionic/react";
import SupportHeader from "./SupportHeader.tsx";
import "./Support.css";

const Support: React.FC = () => {
  return (
    <>
      <SupportHeader />

      <div className="support-content">
        <div className="support-grid">
          {/* IZQUIERDA */}
          <div className="support-item">
            <img
              src="/1.png"
              alt="ORDERS_PAYMENTS"
              className="support-img"
              onClick={() => window.location.href = "/orders-payments"}
            />
            <h5>ORDERS & PAYMENTS</h5>
            <p>Are you having trouble making purchase?</p>
          </div>

          {/* CENTRO */}
          <div className="support-item">
            <img src="/2.png" alt="ACCOUNT_STORE" className="support-img"/>
            <h5>ACCOUNT & STORE</h5>
            <p>Are you having issues with accessing your account or the store itself?</p>
          </div>

          {/* DERECHA */}
          <div className="support-item">
            <img src="/3.png" alt="POLICIES_GENERAL_INFO" className="support-img"/>
            <h5>POLICIES & GENERAL INFO</h5>
            <p>Here you can read our policies, or learn more about our service</p>
          </div>
        </div>

        <h1 className="popular-topics">Popular Support Topics</h1>

        <div className="support-topics">
          <ul>
            <li>How do I buy a game?</li>
            <li>How do I buy a gift?</li>
            <li>How can I change my currency?</li>
            <li>How do I redeem a code?</li>
            <li>I tried to make a payment and it didn't work. What can I do now?</li>
            <li>I got charged and did not get my game</li>
            <li>I cannot log in. What can I do?</li>
            <li>How do I reset my password?</li>
            <li>How do I download my purchased items?</li>
            <li>How do I install my DLC?</li>
            <li>I'm unable to download my game - what can I do?</li>
            <li>How to remove my integration data</li>
          </ul>
        </div>
      </div>
      </>
  );
};

export default Support;