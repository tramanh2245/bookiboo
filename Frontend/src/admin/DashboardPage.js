import React, { useEffect, useState } from 'react';
import { FaBook, FaUsers, FaShoppingCart, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';

// Card tổng quan đẹp hiện đại
const DashboardCard = ({ color1, color2, icon, title, value, loading }) => (
  <div
    className="dashboard-card"
    style={{
      minWidth: 220,
      flex: "1 1 220px",
      borderRadius: 26,
      background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
      boxShadow: "0 4px 18px rgba(30,32,60,0.08)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "34px 14px",
      margin: "12px 6px",
      color: "#23272f",
      position: "relative",
      transition: "transform 0.15s, box-shadow 0.15s"
    }}>
    <div style={{ fontSize: 46, marginBottom: 12 }}>{icon}</div>
    <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 7 }}>{title}</div>
    <div style={{ fontSize: 30, fontWeight: "bold", textShadow: "0 2px 8px #fff" }}>
      {loading ? <span className="skeleton" style={{ width: 60 }} /> : value}
    </div>
  </div>
);

// Tra cứu doanh thu khoảng ngày, giao diện hiện đại hơn
const RevenueByRange = ({ formatVND }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [revenue, setRevenue] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRevenue = async () => {
    if (!from || !to) return;
    setLoading(true);
    setRevenue(null);
    try {
      const url = `http://localhost:8080/bookiboo/Backend/api.php?resource=dashboard&action=revenue_range&date_from=${from}&date_to=${to}`;
      const res = await fetch(url);
      const data = await res.json();
      setRevenue(data.revenue ?? 0);
    } catch {
      setRevenue(0);
    }
    setLoading(false);
  };

  return (
    <div className="revenue-range-block" style={{
      background: "#fff",
      borderRadius: 20,
      boxShadow: "0 2px 12px #e3e6ed",
      margin: "36px auto",
      maxWidth: 650,
      padding: "26px 28px"
    }}>
      <h3 style={{
        fontSize: 21, fontWeight: "900", marginBottom: 18,
        color: "#34495e", letterSpacing: 0.2
      }}>Tra cứu doanh thu khoảng ngày</h3>
      <div style={{
        display: 'flex', gap: 12, alignItems: 'center',
        justifyContent: 'center', marginBottom: 6, flexWrap: 'wrap'
      }}>
        <input
          type="date"
          value={from}
          max={to || undefined}
          onChange={e => setFrom(e.target.value)}
          className="date-input"
        />
        <span style={{ fontWeight: 700, color: "#888" }}>–</span>
        <input
          type="date"
          value={to}
          min={from || undefined}
          onChange={e => setTo(e.target.value)}
          className="date-input"
        />
        <button
          onClick={fetchRevenue}
          disabled={loading || !from || !to}
          className="modern-btn"
          style={{
            marginLeft: 12,
            padding: '8px 22px',
            borderRadius: 8,
            background: 'linear-gradient(90deg, #2563eb 0%, #4f8cff 100%)',
            color: '#fff',
            fontWeight: 800,
            fontSize: 16,
            border: 'none',
            boxShadow: '0 1px 8px #2563eb40',
            transition: "background 0.15s"
          }}>
          Xem
        </button>
      </div>
      <div style={{ marginTop: 16, minHeight: 30, color: "#22c55e", fontWeight: 700, fontSize: 19 }}>
        {loading && <span className="skeleton" style={{ width: 110 }} />}
        {revenue !== null && !loading && (
          <>
            Doanh thu {from !== to
              ? `từ ${from.split('-').reverse().join('/')} đến ${to.split('-').reverse().join('/')}`
              : `ngày ${from.split('-').reverse().join('/')}`} : <span style={{ fontWeight: 800 }}>{formatVND(revenue)}</span>
          </>
        )}
      </div>
    </div>
  );
};

// Đơn hàng gần nhất, bảng đẹp phẳng
const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/bookiboo/Backend/api.php?resource=dashboard&action=recent_orders')
      .then(res => res.json())
      .then(data => setOrders(data.orders || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="recent-orders-block" style={{
      background: "#fff",
      borderRadius: 20,
      boxShadow: "0 2px 12px #e3e6ed",
      margin: "36px auto",
      maxWidth: 650,
      padding: "22px 20px"
    }}>
      <h3 style={{
        fontSize: 20, fontWeight: "900", marginBottom: 18,
        color: "#34495e"
      }}>Đơn hàng gần nhất</h3>
      {loading ? (
        <span className="skeleton" style={{ width: 160, height: 30, display: "inline-block" }} />
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e7eaf6", color: "#222" }}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Khách hàng</th>
                <th style={thStyle}>Thời gian</th>
                <th style={thStyle}>Tổng tiền</th>
                <th style={thStyle}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ color: "#aaa", textAlign: "center", padding: 18 }}>
                    Không có đơn hàng
                  </td>
                </tr>
              ) : (
                orders.slice(0, 6).map(o => (
                  <tr key={o.id} style={{
                    borderBottom: "1px solid #f1f2fa",
                    background: "#fcfdff",
                    transition: "background 0.15s"
                  }}>
                    <td style={tdStyle}>{o.id}</td>
                    <td style={tdStyle}>{o.customer}</td>
                    <td style={tdStyle}>{o.created_at ? new Date(o.created_at).toLocaleString('vi-VN') : ''}</td>
                    <td style={tdStyle}>{o.total && o.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                    <td style={tdStyle}>{o.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const thStyle = {
  padding: "10px 7px",
  textAlign: "left",
  background: "#f7fafd",
  fontWeight: 900,
  fontSize: 15,
  letterSpacing: 0.2
};
const tdStyle = {
  padding: "8px 7px",
  fontSize: 14,
  fontWeight: 500
};

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalBooks: 0, totalUsers: 0, totalOrders: 0, totalEvents: 0,
    revenueToday: 0, revenueThisMonth: 0, revenueThisYear: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/bookiboo/Backend/api.php?resource=dashboard&action=stats", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => { if (data.success) setStats(data.data); })
      .catch((err) => console.error("Lỗi khi fetch dashboard:", err))
      .finally(() => setLoading(false));
  }, []);

  const formatVND = (num) =>
    num?.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) || "";

  return (
    <div style={{
      maxWidth: 1140,
      margin: "32px auto",
      padding: "32px 12px",
      borderRadius: 20,
      background: "linear-gradient(120deg, #f5f8fa 50%, #e9eaf6 100%)",
      boxShadow: "0 7px 32px #d7dae9"
    }}>
      {/* CSS nội tuyến */}
      <style>{`
        .dashboard-card:hover {
          transform: translateY(-4px) scale(1.04);
          box-shadow: 0 8px 32px #bbc0e3;
        }
        .date-input {
          border-radius: 8px;
          border: 1.5px solid #d3daf3;
          padding: 7px 12px;
          font-size: 15px;
          background: #f5f8fa;
          outline: none;
          transition: border 0.16s;
        }
        .date-input:focus {
          border-color: #2563eb;
          background: #fafdff;
        }
        .modern-btn:active {
          filter: brightness(0.92);
        }
        /* Skeleton loader */
        .skeleton {
          background: linear-gradient(90deg, #ececec 30%, #f2f2f2 60%, #ececec 90%);
          background-size: 200% 100%;
          animation: skeleton 1.3s infinite linear;
          border-radius: 6px;
          height: 1.2em;
          display: inline-block;
        }
        @keyframes skeleton {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        /* Responsive */
        @media (max-width: 1100px) {
          .dashboard-cards-group { flex-wrap: wrap; }
        }
        @media (max-width: 900px) {
          .dashboard-cards-group { flex-direction: column; gap: 1.3rem !important; }
        }
        @media (max-width: 600px) {
          .dashboard-card, .recent-orders-block, .revenue-range-block {
            min-width: unset !important;
            max-width: 98vw !important;
            border-radius: 12px !important;
            padding: 18px 2vw !important;
          }
        }
      `}</style>

      <h1 style={{
        fontSize: "2.3rem", fontWeight: 900, color: "#23272f", letterSpacing: 0.8,
        marginBottom: "36px", textAlign: "center", textShadow: "0 3px 18px #e8ebf4"
      }}>
        Dashboard Bookiboo
      </h1>
      <div className="dashboard-cards-group" style={{
        display: "flex", gap: "2.5rem", flexWrap: "wrap", justifyContent: "center", marginBottom: 38
      }}>
        <DashboardCard color1="#f6d365" color2="#fda085" icon={<FaBook />} title="Tổng sách" value={stats.totalBooks} loading={loading} />
        <DashboardCard color1="#43e97b" color2="#38f9d7" icon={<FaUsers />} title="Tổng users" value={stats.totalUsers} loading={loading} />
        <DashboardCard color1="#fad0c4" color2="#ffd1ff" icon={<FaShoppingCart />} title="Tổng đơn" value={stats.totalOrders} loading={loading} />
        <DashboardCard color1="#fbc2eb" color2="#a6c1ee" icon={<FaCalendarAlt />} title="Sự kiện" value={stats.totalEvents} loading={loading} />
        <DashboardCard color1="#f7971e" color2="#ffd200" icon={<FaMoneyBillWave />} title="Doanh thu hôm nay" value={formatVND(stats.revenueToday)} loading={loading} />
        <DashboardCard color1="#43cea2" color2="#185a9d" icon={<FaMoneyBillWave />} title="Tháng này" value={formatVND(stats.revenueThisMonth)} loading={loading} />
        <DashboardCard color1="#ffaf7b" color2="#d76d77" icon={<FaMoneyBillWave />} title="Năm nay" value={formatVND(stats.revenueThisYear)} loading={loading} />
      </div>
      <RevenueByRange formatVND={formatVND} />
      <RecentOrders />
    </div>
  );
};

export default DashboardPage;
