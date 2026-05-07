import React from "react";
import "./PaymentModal.css";

export default function PaymentModal({ payment, onClose }) {
  if (!payment) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatMoney = (amount) => {
    const value = Number(amount ?? 0);
    return isNaN(value) ? "0.00" : value.toFixed(2);
  };

  const parseItems = () => {
    if (!payment.items) return null;
    try {
      const parsed = typeof payment.items === "string" ? JSON.parse(payment.items) : payment.items;
      if (Array.isArray(parsed)) {
        return parsed;
      }
      if (typeof parsed === "object") {
        return [parsed];
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  const items = parseItems();

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
                <p className="order-id">{payment.orderId || "-"}</p>
              </div>
              <div className="info-item">
                <label>Payment ID</label>
                <p>{payment.paymentId || "-"}</p>
              </div>
              <div className="info-item">
                <label>Producto</label>
                <p>{payment.productName || "-"}</p>
              </div>
              <div className="info-item">
                <label>Monto</label>
                <p className="amount">{formatMoney(payment.amount)} €</p>
              </div>
              <div className="info-item">
                <label>Estado</label>
                <p className={`status ${payment.status?.toLowerCase()}`}>{payment.status || "-"}</p>
              </div>
              <div className="info-item">
                <label>Usuario</label>
                <p>{payment.user?.username || payment.user?.email || "-"}</p>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <label>Fecha creación</label>
            <p>{formatDate(payment.createdAt)}</p>
          </div>

          {payment.description && (
            <div className="modal-section">
              <label>Descripción</label>
              <p>{payment.description}</p>
            </div>
          )}

          {items && items.length > 0 && (
            <div className="modal-section">
              <label>Items</label>
              <div className="items-list">
                {items.map((item, index) => (
                  <div key={index} className="item-row">
                    <p>{item.name || item.productName || `Item ${index + 1}`}</p>
                    {item.quantity != null && <span> x{item.quantity}</span>}
                    {item.price != null && <span> - {formatMoney(item.price)} €</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {payment.gameImage && (
            <div className="modal-section">
              <label>Imagen</label>
              <img src={payment.gameImage} alt={payment.productName || "Imagen del producto"} style={{ maxWidth: "100%", borderRadius: "10px" }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
