import { useState, useEffect } from "react";
import {
  getAllSupportRequests,
  updateSupportStatus,
  deleteSupport
} from "../services/supportService";
import SupportModal from "./SupportModal";
import toast from "react-hot-toast";
import "./SupportTable.css";

const PAGE_SIZE = 5;

export default function SupportTable() {
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    let data = [...requests];

    // Solo mostrar tickets no eliminados
    data = data.filter(r => !r.deleted);

    if (filterStatus !== "ALL") {
      data = data.filter(r => r.status === filterStatus);
    }

    if (search.trim() !== "") {
      data = data.filter(r =>
        r.email.toLowerCase().includes(search.toLowerCase()) ||
        r.orderId.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
    setCurrentPage(1);
  }, [requests, search, filterStatus]);

  const fetchRequests = async () => {
    try {
      const data = await getAllSupportRequests();
      setRequests(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateSupportStatus(id, status);
      toast.success(`Estado actualizado a ${status}`);
      fetchRequests();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSupport(id);
      toast.success("Solicitud eliminada");
      fetchRequests();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const displayed = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="table-cont">
      <h2>Solicitudes de Soporte</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por email o orderId"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="ALL">Todos</option>
          <option value="OPEN">Abiertos</option>
          <option value="IN_PROGRESS">En progreso</option>
          <option value="CLOSED">Cerrados</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Order ID</th>
            <th>Asunto</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {displayed.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.email}</td>
              <td>{r.orderId}</td>
              <td>{r.subject}</td>
              <td>{r.status}</td>
              <td>
                <button onClick={() => setSelectedRequest(r)}>Ver</button>
                <button onClick={() => handleUpdateStatus(r.id, "IN_PROGRESS")}>
                  En progreso
                </button>
                <button onClick={() => handleDelete(r.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {selectedRequest && (
        <SupportModal
          request={selectedRequest}
          onClose={() => {
            setSelectedRequest(null);
            fetchRequests();
          }}
        />
      )}
    </div>
  );
}