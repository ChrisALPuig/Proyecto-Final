import React from "react";
import { motion } from "framer-motion";

const FiltersBar = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { key: "today", label: "Today" },
    { key: "7days", label: "7 Days" },
    { key: "30days", label: "30 Days" },
    { key: "1year", label: "1 Year" },
  ];

  return (
    <div className="filters-bar">
      {filters.map((filter) => (
        <motion.button
          key={filter.key}
          className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
          onClick={() => setActiveFilter(filter.key)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
};

export default FiltersBar;