import React, { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus, deleteOrder } from '../server/api';

const CartAdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getAllOrders(token);
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      alert(error.message || "Lỗi khi tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    if (!window.confirm("Bạn chắc chắn muốn cập nhật trạng thái đơn hàng này?")) return;
    try {
      await updateOrderStatus(token, orderId, newStatus);
      setOrders(orders =>
        orders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      alert("Cập nhật trạng thái thành công!");
    } catch (error) {
      alert(error.message || "Cập nhật thất bại!");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa đơn hàng này?")) return;
    try {
      await deleteOrder(token, orderId);
      setOrders(orders => orders.filter(order => order.id !== orderId));
      alert("Xóa đơn hàng thành công!");
    } catch (error) {
      alert(error.message || "Xóa thất bại!");
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: 30 }}>Đang tải dữ liệu...</div>;

  return (
    <div style={{ maxWidth: 1200, margin: '24px auto', padding: 20 }}>
      <h1 style={{ fontSize: '1.6rem', marginBottom: 16 }}>Quản lý Đơn hàng</h1>
      {orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        <table style={{
          width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden'
        }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: 12 }}>ID</th>
              <th style={{ padding: 12 }}>Khách hàng</th>
              <th style={{ padding: 12 }}>Tổng tiền</th>
              <th style={{ padding: 12 }}>Trạng thái</th>
              <th style={{ padding: 12 }}>Chi tiết</th>
              <th style={{ padding: 12 }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: 12 }}>{order.id}</td>
                <td style={{ padding: 12 }}>{order.user_name || order.user_id}</td>
                <td style={{ padding: 12 }}>${order.total_price}</td>
                <td style={{ padding: 12 }}>
                  <select
                    value={order.status}
                    onChange={e => handleUpdateStatus(order.id, e.target.value)}
                  >
                    <option value="pending">Đang chờ</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                </td>
                <td style={{ padding: 12 }}>
                  <button
                    style={{
                      background: '#1e90ff', color: '#fff', border: 'none',
                      padding: '6px 14px', borderRadius: 4, cursor: 'pointer'
                    }}
                    onClick={() => setSelectedOrder(order)}
                  >Chi tiết</button>
                </td>
                <td style={{ padding: 12 }}>
                  <button
                    style={{
                      background: '#ff4444', color: '#fff', border: 'none',
                      padding: '6px 14px', borderRadius: 4, cursor: 'pointer'
                    }}
                    onClick={() => handleDeleteOrder(order.id)}
                  >Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal chi tiết đơn hàng */}
      {selectedOrder && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.4)', zIndex: 99, display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            style={{
              background: '#fff', borderRadius: 8, padding: 28, minWidth: 380,
              boxShadow: '0 2px 10px rgba(0,0,0,0.15)', position: 'relative'
            }}
            onClick={e => e.stopPropagation()}
          >
            <h2>Chi tiết đơn hàng #{selectedOrder.id}</h2>
            <p><b>Khách hàng:</b> {selectedOrder.user_name || selectedOrder.user_id}</p>
            <p><b>Thời gian:</b> {selectedOrder.created_at}</p>
            <p><b>Trạng thái:</b> <span style={{ color: '#1e90ff', fontWeight: 500 }}>{selectedOrder.status}</span></p>
            <p><b>Tổng tiền:</b> ${selectedOrder.total_price}</p>
            <h4>Sản phẩm:</h4>
            <ul>
              {selectedOrder.order_items.map(item => (
                <li key={item.id}>
                  <b>{item.title}</b> - SL: {item.quantity} - Đơn giá: ${item.price}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedOrder(null)}
              style={{
                position: 'absolute', top: 16, right: 20, border: 'none',
                background: '#f5f5f5', borderRadius: '50%', width: 28, height: 28, fontSize: 16, cursor: 'pointer'
              }}
              title="Đóng"
            >×</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default CartAdminPage;
