import React, { useEffect, useState } from "react";
import { getAllUsers, addUser, updateUser, deleteUser } from "../server/api";

const defaultForm = { name: "", email: "", password: "", role: "user" };

const UserAdminPage = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  // Lấy users
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError("Không thể tải danh sách người dùng.");
    }
  };

  // Mở form sửa
  const handleEdit = (user) => {
    setForm({ ...user, password: "" }); // Không điền password cũ
    setEditingId(user.id);
    setShowForm(true);
  };

  // Mở form thêm
  const handleAdd = () => {
    setForm(defaultForm);
    setEditingId(null);
    setShowForm(true);
  };

  // Xoá user
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn xoá user này?")) return;
    const res = await deleteUser(id);
    if (res.success) {
      setUsers(users.filter(u => u.id !== id));
      alert("Xoá thành công");
    } else {
      alert(res.message || "Lỗi xoá user");
    }
  };

  // Gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || (!editingId && !form.password)) {
      alert("Không được bỏ trống Name, Email và Password (nếu thêm mới)");
      return;
    }
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => v && formData.append(k, v));
    let res;
    if (editingId) {
      formData.append("id", editingId);
      res = await updateUser(formData);
    } else {
      res = await addUser(formData);
    }
    if (res.success) {
      setShowForm(false);
      setForm(defaultForm);
      fetchUsers();
      alert(editingId ? "Cập nhật thành công" : "Thêm mới thành công");
    } else {
      alert(res.message || "Có lỗi xảy ra!");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>User Management</h1>
      <button onClick={handleAdd} style={{ marginBottom: '20px', padding: '10px 15px', borderRadius: '4px', backgroundColor: '#0ea5e9', color: '#fff', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>+ Thêm User</button>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px 12px', textAlign: 'left', backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px 12px', textAlign: 'left', backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px 12px', textAlign: 'left', backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px 12px', textAlign: 'left', backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>Role</th>
            <th style={{ border: '1px solid #ddd', padding: '8px 12px', textAlign: 'left', backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan={5} style={{ padding: '10px', fontStyle: 'italic', color: '#777' }}>Không có người dùng nào.</td></tr>
          ) : users.map(u => (
            <tr key={u.id} style={{ backgroundColor: users.indexOf(u) % 2 === 1 ? '#f9f9f9' : 'transparent' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px 12px' }}>{u.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px 12px' }}>{u.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px 12px' }}>{u.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px 12px' }}>{u.role}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px 12px' }}>
                <button onClick={() => handleEdit(u)} style={{ padding: '8px 12px', marginRight: '5px', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'opacity 0.3s ease', backgroundColor: '#22c55e', color: '#fff' }}>Sửa</button>
                <button onClick={() => handleDelete(u.id)} style={{ padding: '8px 12px', marginRight: '5px', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'opacity 0.3s ease', backgroundColor: '#dc2626', color: '#fff' }}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px', marginTop: '24px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ color: '#333', marginBottom: '15px' }}>{editingId ? "Chỉnh sửa user" : "Thêm user mới"}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Name:</label>
              <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required style={{ width: 'calc(100% - 12px)', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Email:</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required style={{ width: 'calc(100% - 12px)', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Password:</label>
              <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder={editingId ? "Để trống nếu không đổi" : ""} style={{ width: 'calc(100% - 12px)', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Role:</label>
              <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} style={{ width: 'calc(100% - 12px)', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" style={{ padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', transition: 'opacity 0.3s ease', backgroundColor: '#1d4ed8', color: '#fff' }}>{editingId ? "Lưu" : "Thêm"}</button>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', transition: 'opacity 0.3s ease', backgroundColor: '#6b7280', color: '#fff' }}>Huỷ</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserAdminPage;