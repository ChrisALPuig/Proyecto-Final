import { useState, useEffect, useMemo } from "react";
import { getAllPayments } from "../services/paymentService";
import PaymentModal from "./PaymentModal";
import "./PaymentsTable.css";

export default function PaymentsTable() {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  useEffect(() => {
    getAllPayments()
      .then(setPayments)
      .catch((err) => setError(err.message));
  }, []);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch = [
        payment.paymentId,
        payment.orderId,
        payment.productName,
        payment.status,
        payment.user?.username,
        payment.user?.email,
      ]
        .filter(Boolean)
        .some((value) => value.toString().toLowerCase().includes(search.toLowerCase()));

      const matchesStatus =
        filterStatus === "ALL" || payment.status?.toLowerCase() === filterStatus.toLowerCase();

      const amountValue = Number(payment.amount ?? 0);
      const matchesMin = minAmount === "" || amountValue >= Number(minAmount);
      const matchesMax = maxAmount === "" || amountValue <= Number(maxAmount);

      return matchesSearch && matchesStatus && matchesMin && matchesMax;
    });
  }, [payments, search, filterStatus, minAmount, maxAmount]);

  const formatMoney = (amount) => {
    const value = Number(amount ?? 0);
    return isNaN(value) ? "0.00" : value.toFixed(2);
  };

  const formatDate = (rawDate) => {
    if (!rawDate) return "-";
    return new Date(rawDate).toLocaleString("es-ES", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="table-container">
      <h2>Pagos</h2>

      <div className="filters">
        <div className="filter-group">
          <label>Buscar</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Order ID, Payment ID, producto o usuario"
          />
        </div>

        <div className="filter-group">
          <label>Estado</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="ALL">Todos</option>
            <option value="created">created</option>
            <option value="pending">pending</option>
            <option value="success">success</option>
            <option value="failed">failed</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Rango de monto</label>
          <div className="price-range">
            <input
              type="number"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              placeholder="Min"
              min="0"
            />
            <span>–</span>
            <input
              type="number"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              placeholder="Max"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID de Pago</th>
              <th>Order ID</th>
              <th>Producto</th>
              <th>Usuario</th>
              <th>Monto (€)</th>
              <th>Fecha</th>
              <th>Status</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">
                  No se encontraron pagos.
                </td>
              </tr>
            ) : (
              filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="order-id">{payment.paymentId || payment.id}</td>
                  <td>{payment.orderId || "-"}</td>
                  <td>{payment.productName || "-"}</td>
                  <td>{payment.user?.username || payment.user?.email || "-"}</td>
                  <td className="amount">{formatMoney(payment.amount)}</td>
                  <td className="date">{formatDate(payment.createdAt)}</td>
                  <td>
                    <span className={`status ${payment.status?.toLowerCase()}`}>
                      {payment.status || "-"}
                    </span>
                  </td>
                  <td>
                    <button className="details-btn" onClick={() => setSelectedPayment(payment)}>
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedPayment && (
        <PaymentModal payment={selectedPayment} onClose={() => setSelectedPayment(null)} />
      )}
    </div>
  );
}
