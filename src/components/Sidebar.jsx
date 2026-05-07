import React from "react";
import "./Sidebar.css";

export default function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "payments", label: "Pagos" },
    { id: "support", label: "Soporte" },
  ];

  return (
    <div className="sidebar">
      <h1 className="sidebar-title">Admin Panel</h1>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={activeTab === tab.id ? "sidebar-btn active" : "sidebar-btn"}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}