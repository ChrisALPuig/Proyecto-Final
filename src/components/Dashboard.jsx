import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { startOfDay, endOfDay, subDays, startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear, isWithinInterval } from "date-fns";
import { getAllPayments } from "../services/paymentService";
import MetricCard from "./MetricCard";
import RevenueChart from "./RevenueChart";
import TopGamesChart from "./TopGamesChart";
import PaymentStatusChart from "./PaymentStatusChart";
import FiltersBar from "./FiltersBar";
import RecentTransactions from "./RecentTransactions";
import LoadingSpinner from "./LoadingSpinner";
import { TrendingUp, DollarSign, ShoppingCart, Users, AlertCircle, Target } from "lucide-react";
import "./Dashboard.css";

export default function Dashboard() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("30days");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getAllPayments();
        setPayments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const filteredPayments = useMemo(() => {
    const now = new Date();
    let start, end;
    switch (activeFilter) {
      case "today":
        start = startOfDay(now);
        end = endOfDay(now);
        break;
      case "7days":
        start = startOfDay(subDays(now, 7));
        end = endOfDay(now);
        break;
      case "30days":
        start = startOfDay(subDays(now, 30));
        end = endOfDay(now);
        break;
      case "1year":
        start = startOfYear(now);
        end = endOfYear(now);
        break;
      default:
        start = startOfDay(subDays(now, 30));
        end = endOfDay(now);
    }
    return payments.filter(payment =>
      isWithinInterval(new Date(payment.createdAt), { start, end })
    );
  }, [payments, activeFilter]);

  const metrics = useMemo(() => {
    const totalRevenue = filteredPayments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
    const totalTransactions = filteredPayments.length;
    const averageTicket = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;
    const failedPayments = filteredPayments.filter(p => p.status !== 'COMPLETED').length;

    // Mock changes (in real app, compare with previous period)
    const revenueChange = 12.5;
    const transactionsChange = 8.3;
    const ticketChange = -2.1;
    const failedChange = -15.7;

    return {
      totalRevenue,
      totalTransactions,
      averageTicket,
      failedPayments,
      revenueChange,
      transactionsChange,
      ticketChange,
      failedChange,
    };
  }, [filteredPayments]);

  const revenueChartData = useMemo(() => {
    const data = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = subDays(now, i);
      const dayPayments = filteredPayments.filter(p =>
        new Date(p.createdAt).toDateString() === date.toDateString()
      );
      const revenue = dayPayments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
      data.push({
        date: date.toLocaleDateString(),
        revenue: revenue,
      });
    }
    return data;
  }, [filteredPayments]);

  const topGamesData = useMemo(() => {
    const gameSales = filteredPayments.reduce((acc, p) => {
      acc[p.productName] = (acc[p.productName] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(gameSales)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, sales]) => ({ name, sales }));
  }, [filteredPayments]);

  const paymentStatusData = useMemo(() => {
    const statusCount = filteredPayments.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(statusCount).map(([name, value]) => ({ name, value }));
  }, [filteredPayments]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dashboard-header">
        <h1>ChestGames Dashboard</h1>
        <FiltersBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      </div>

      <div className="metrics-grid">
        <MetricCard
          title="Total Revenue"
          value={`$${metrics.totalRevenue.toFixed(2)}`}
          change={metrics.revenueChange}
          icon={<DollarSign />}
          color="#7c3aed"
        />
        <MetricCard
          title="Total Transactions"
          value={metrics.totalTransactions}
          change={metrics.transactionsChange}
          icon={<ShoppingCart />}
          color="#2563eb"
        />
        <MetricCard
          title="Average Ticket"
          value={`$${metrics.averageTicket.toFixed(2)}`}
          change={metrics.ticketChange}
          icon={<TrendingUp />}
          color="#10b981"
        />
        <MetricCard
          title="Failed Payments"
          value={metrics.failedPayments}
          change={metrics.failedChange}
          icon={<AlertCircle />}
          color="#ef4444"
        />
      </div>

      <div className="charts-grid">
        <RevenueChart data={revenueChartData} />
        <TopGamesChart data={topGamesData} />
        <PaymentStatusChart data={paymentStatusData} />
      </div>

      <RecentTransactions transactions={filteredPayments} />
    </motion.div>
  );
}