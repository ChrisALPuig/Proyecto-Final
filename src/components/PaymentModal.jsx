import React from "react";
import "./PaymentModal.css";

export default function PaymentModal({ payment, onClose }) {
  if (!payment) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>
        <h3>Detalles del Pago #{payment.id}</h3>
        
        <div className="modal-content">
          <div className="modal-section">
            <div className="info-grid">
              <div className="info-item">
                <label>Order ID</label>
                <p className="order-id">{payment.orderId}</p>
              </div>
              <div className="info-item">
                <label>Monto</label>
                <p className="amount">{payment.amount.toFixed(2)} €</p>
              </div>
              <div className="info-item">
                <label>Payment ID</label>
                <p>{payment.paymentId}</p>
              </div>
              <div className="info-item">
                <label>Nombre del Producto</label>
                <p>{payment.productName || 'N/A'}</p>
              </div>
            </div>
          </div>

          {payment.timestamp && (
            <div className="modal-section">
              <label>Fecha</label>
              <p>{formatDate(payment.timestamp)}</p>
            </div>
          )}

          {payment.description && (
            <div className="modal-section">
              <label>Descripción</label>
              <p>{payment.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
