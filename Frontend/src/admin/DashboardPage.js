import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../server/api';
import { FaBook, FaUsers, FaShoppingCart, FaCalendarAlt } from 'react-icons/fa';

const DashboardPage = () => {
  const [stats, setStats] = useState({ totalBooks: 0, totalUsers: 0, totalOrders: 0, totalEvents: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    getDashboardStats(token)
      .then((data) => setStats(data))
      .catch((err) => console.error("Lỗi khi fetch dashboard:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{
      maxWidth: 1100,
      margin: "40px auto",
      padding: "32px 24px",
      borderRadius: 18,
      background: "#f5f8fa",
      boxShadow: "0 6px 36px #d5dbe6"
    }}>
      <h1 style={{
        fontSize: "2.2rem",
        fontWeight: 900,
        color: "#23272f",
        letterSpacing: 0.5,
        marginBottom: "36px",
        textAlign: "center",
        textShadow: "0 3px 18px #dadada"
      }}>
        Dashboard Overview
      </h1>
      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "#888", fontSize: 24 }}>
          Loading stats...
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "2.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={cardStyle("#f6d365", "#fda085", "#ad540a", "#f06128")}>
            <FaBook style={{ fontSize: 36, color: "#ad540a", marginBottom: 10 }} />
            <div style={cardTitle}>Total Books</div>
            <div style={cardNumber("#f06128")}>{stats.totalBooks}</div>
          </div>
          <div style={cardStyle("#43e97b", "#38f9d7", "#14785b", "#16a34a")}>
            <FaUsers style={{ fontSize: 36, color: "#14785b", marginBottom: 10 }} />
            <div style={cardTitle}>Total Users</div>
            <div style={cardNumber("#16a34a")}>{stats.totalUsers}</div>
          </div>
          <div style={cardStyle("#fad0c4", "#ffd1ff", "#b85fbd", "#b85fbd")}>
            <FaShoppingCart style={{ fontSize: 36, color: "#b85fbd", marginBottom: 10 }} />
            <div style={cardTitle}>Total Orders</div>
            <div style={cardNumber("#b85fbd")}>{stats.totalOrders}</div>
          </div>
          <div style={cardStyle("#fbc2eb", "#a6c1ee", "#7c4796", "#7c4796")}>
            <FaCalendarAlt style={{ fontSize: 36, color: "#7c4796", marginBottom: 10 }} />
            <div style={cardTitle}>Total Events</div>
            <div style={cardNumber("#7c4796")}>{stats.totalEvents}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const cardStyle = (color1, color2, iconColor, numberColor) => ({
  minWidth: 220,
  flex: "1 1 240px",
  background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
  borderRadius: 12,
  boxShadow: `0 3px 18px rgba(40,40,40,0.07)`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "38px 16px",
  transition: "transform .18s, box-shadow .18s",
});

const cardTitle = {
  fontWeight: 700,
  fontSize: 21,
  color: "#222",
  marginBottom: 12
};
const cardNumber = (color) => ({
  fontSize: 40,
  fontWeight: "bold",
  color,
  textShadow: "0 2px 8px #fff"
});

export default DashboardPage;
