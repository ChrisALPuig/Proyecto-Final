import React from "react";
import { motion } from "framer-motion";

const MetricCard = ({ title, value, change, icon, color = "#7c3aed" }) => {
  return (
    <motion.div
      className="metric-card"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="metric-icon" style={{ color }}>
        {icon}
      </div>
      <div className="metric-content">
        <h3>{title}</h3>
        <p className="metric-value">{value}</p>
        {change && (
          <span className={`metric-change ${change > 0 ? 'positive' : 'negative'}`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default MetricCard;