import React from "react";
import { motion } from "framer-motion";

const RecentTransactions = ({ transactions }) => {
  return (
    <div className="recent-transactions">
      <h3>Recent Transactions</h3>
      <div className="transactions-list">
        {transactions.slice(0, 10).map((transaction, index) => (
          <motion.div
            key={transaction.id}
            className="transaction-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="transaction-info">
              <span className="product">{transaction.productName}</span>
              <span className="amount">${parseFloat(transaction.amount).toFixed(2)}</span>
            </div>
            <span className="date">{new Date(transaction.createdAt).toLocaleDateString()}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;