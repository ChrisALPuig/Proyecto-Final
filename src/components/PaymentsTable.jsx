import { useState, useEffect } from "react";
import { getAllPayments } from "../services/paymentService";
import "./PaymentsTable.css";

export default function PaymentsTable() {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllPayments()
      .then(setPayments)
      .catch(err => setError(err.message));
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="table-cont">
      <h2>Pagos</h2>
      <table>
        <thead>
          <tr>
            <th>ID de Pago</th>
            <th>Order ID</th>
            <th>Monto (€)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id}>
              <td>{p.paymentId}</td>
              <td>{p.orderId}</td>
              <td>{p.amount}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}