import { IonPage, IonRouterLink } from "@ionic/react";
import SupportHeader from "./SupportHeader.tsx";
import "./FormularioComponente.css";

const FormularioComponente: React.FC = () => {
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
        <div className="title-contact">
        <h1 className="title-contact-uno">Submit a request</h1>
        </div>
        <div className="p-contact">
        <p>Please outline your issue here. Someone from our friendly and 
            knowledgeable <br />staff will be with you as soon as possible 
            (typically within 24 hours).
        </p>
        </div>
        <div className="contact">
        <div className="p-form">
            <p>Your email address *</p>
            <div>
            <input type="text"className="inputs-form"/>
            </div>
            <div className="p-form-1">
            <p>Order ID</p>
            <input type="text"className="inputs-form-1"/>
            </div>
            <div className="p-form-2">
            <p>Subject*</p>
            <input type="text"className="inputs-form-2"/>
            </div>
            <div className="p-form-3">
            <p>Description*</p>
            <input type="text"className="inputs-form-3"/>
            </div>
            <div className="p-form-4">
            <p>Attachments</p>
            <input type="text"className="inputs-form-4"/>
            </div>
            
        </div>
        <div className="mover-boton">
          <IonRouterLink routerLink="/confirmacion">
            <button className="contact-boton-dos">SEND</button>
          </IonRouterLink>
            </div>
        </div>
      </div>
      </>
  );
};

export default FormularioComponente;