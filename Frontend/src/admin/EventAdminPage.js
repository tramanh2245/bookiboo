import React, { useEffect, useState } from "react";
import {
  getAllEventsAdmin,
  addEventAdmin,
  updateEventAdmin,
  deleteEventAdmin,
} from "../server/api";

const defaultForm = {
  title: "",
  description: "",
  date: "",
  image_url: "",
  location: "",
  speaker_name: "",
  speaker_avatar: "",
  author: ""
};

const EventAdminPage = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [speakerFile, setSpeakerFile] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getAllEventsAdmin();
      const eventList =
        data && Array.isArray(data.data) ? data.data :
        (Array.isArray(data) ? data : []);
      setEvents(eventList);
    } catch (err) {
      alert("Không thể tải danh sách sự kiện.\n" + err?.message);
      console.error("Lỗi chi tiết:", err);
    }
    setLoading(false);
  };

  const handleEdit = (event) => {
    setForm({ ...event });
    setEditingId(event.id);
    setImageFile(null);
    setSpeakerFile(null);
    setShowForm(true);
  };
  const handleAdd = () => {
    setForm(defaultForm);
    setEditingId(null);
    setImageFile(null);
    setSpeakerFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn xoá sự kiện này?")) return;
    const res = await deleteEventAdmin(id);
    if (res.success) {
      setEvents(events.filter(e => e.id !== id));
      alert("Xoá thành công");
    } else {
      alert(res.message || "Lỗi xoá sự kiện");
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setForm(f => ({ ...f, image_url: '' }));
  };
  const handleSpeakerChange = (e) => {
    setSpeakerFile(e.target.files[0]);
    setForm(f => ({ ...f, speaker_avatar: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.date || !form.location || !form.author) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc.");
      return;
    }
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (imageFile) data.append('image_url', imageFile);
    if (speakerFile) data.append('speaker_avatar', speakerFile);
    if (editingId) data.append('id', editingId);

    let res;
    if (editingId) {
      res = await updateEventAdmin(data);
    } else {
      res = await addEventAdmin(data);
    }
    if (res.success) {
      setShowForm(false);
      setForm(defaultForm);
      setImageFile(null); setSpeakerFile(null);
      fetchEvents();
      alert(editingId ? "Cập nhật thành công" : "Thêm mới thành công");
    } else {
      alert(res.message || "Có lỗi xảy ra!");
    }
  };

  return (
    <div style={{
      padding: "30px",
      fontFamily: "sans-serif",
      maxWidth: 1200,
      margin: "0 auto"
    }}>
      <h1 style={{
        color: "#333",
        marginBottom: "20px",
        textAlign: "center",
        fontWeight: 900,
        fontSize: 32
      }}>Event Management</h1>
      <button
        onClick={handleAdd}
        style={{
          marginBottom: "22px",
          padding: "11px 24px",
          borderRadius: 6,
          backgroundColor: "#a855f7",
          color: "#fff",
          border: "none",
          fontWeight: 700,
          fontSize: 16,
          cursor: "pointer",
          transition: "background .18s"
        }}
      >+ Thêm Sự Kiện</button>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: 24,
        boxShadow: "0 2px 4px rgba(0,0,0,0.08)"
      }}>
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Image</th>
            <th style={th}>Title</th>
            <th style={th}>Date</th>
            <th style={th}>Location</th>
            <th style={th}>Speaker</th>
            <th style={th}>Author</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} style={{ textAlign: "center", padding: 18, fontSize: 19, color: "#888" }}>Đang tải...</td>
            </tr>
          ) : events.length === 0 ? (
            <tr>
              <td colSpan={8} style={{ padding: 10, fontStyle: "italic", color: "#777" }}>Không có sự kiện nào.</td>
            </tr>
          ) : events.map(event => (
            <tr key={event.id} style={{ backgroundColor: events.indexOf(event) % 2 === 1 ? "#f9f9f9" : "transparent" }}>
              <td style={td}>{event.id}</td>
              <td style={td}>
                {event.image_url && <img src={event.image_url} alt="" style={{ width: 64, borderRadius: 5 }} />}
              </td>
              <td style={td}>{event.title}</td>
              <td style={td}>{event.date}</td>
              <td style={td}>{event.location}</td>
              <td style={td}>
                {event.speaker_avatar && <img src={event.speaker_avatar} alt="" style={{ width: 38, height: 38, borderRadius: "50%", marginRight: 5, verticalAlign: "middle" }} />}
                <span>{event.speaker_name}</span>
              </td>
              <td style={td}>{event.author}</td>
              <td style={td}>
                <button onClick={() => handleEdit(event)} style={editBtn}>Sửa</button>
                <button onClick={() => handleDelete(event.id)} style={delBtn}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <div style={{
          background: "#f9fafb",
          padding: "28px",
          borderRadius: "8px",
          marginTop: "18px",
          boxShadow: "0 2px 8px #e4e4e4"
        }}>
          <h3 style={{ color: "#333", marginBottom: 18, fontWeight: 700 }}>{editingId ? "Chỉnh sửa sự kiện" : "Thêm sự kiện mới"}</h3>
          <form onSubmit={handleSubmit}>
            <Input label="Title" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} />
            <Input label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} textarea />
            <Input label="Date" type="date" value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} />
            {/* Chọn file ảnh sự kiện */}
            <div style={{ marginBottom: 17 }}>
              <label style={{ display: "block", marginBottom: 6, fontWeight: "bold", color: "#444" }}>Image (ảnh sự kiện):</label>
              {form.image_url && !imageFile && (
                <img src={form.image_url} alt="Event" style={{ maxWidth: 120, marginBottom: 6, borderRadius: 7 }} />
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <Input label="Location" value={form.location} onChange={v => setForm(f => ({ ...f, location: v }))} />
            <Input label="Speaker Name" value={form.speaker_name} onChange={v => setForm(f => ({ ...f, speaker_name: v }))} />
            {/* Chọn file avatar diễn giả */}
            <div style={{ marginBottom: 17 }}>
              <label style={{ display: "block", marginBottom: 6, fontWeight: "bold", color: "#444" }}>Speaker Avatar (ảnh diễn giả):</label>
              {form.speaker_avatar && !speakerFile && (
                <img src={form.speaker_avatar} alt="Speaker" style={{ maxWidth: 80, marginBottom: 6, borderRadius: "50%" }} />
              )}
              <input type="file" accept="image/*" onChange={handleSpeakerChange} />
            </div>
            <Input label="Author" value={form.author} onChange={v => setForm(f => ({ ...f, author: v }))} />
            <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
              <button type="submit" style={submitBtn}>{editingId ? "Lưu" : "Thêm"}</button>
              <button type="button" onClick={() => setShowForm(false)} style={cancelBtn}>Huỷ</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const th = {
  border: "1px solid #ddd",
  padding: "10px 14px",
  textAlign: "left",
  background: "#e0e7ff",
  fontWeight: "bold"
};
const td = {
  border: "1px solid #ddd",
  padding: "10px 14px"
};
const editBtn = {
  padding: "8px 14px",
  marginRight: 8,
  border: "none",
  borderRadius: 4,
  background: "#22c55e",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
  transition: "background .15s"
};
const delBtn = {
  padding: "8px 14px",
  border: "none",
  borderRadius: 4,
  background: "#dc2626",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
  transition: "background .15s"
};
const submitBtn = {
  padding: "12px 28px",
  border: "none",
  borderRadius: 5,
  background: "#a855f7",
  color: "#fff",
  fontWeight: 900,
  fontSize: 16,
  cursor: "pointer",
  letterSpacing: 1.1,
  boxShadow: "0 2px 10px #eee"
};
const cancelBtn = {
  padding: "12px 24px",
  border: "none",
  borderRadius: 5,
  background: "#6b7280",
  color: "#fff",
  fontWeight: 700,
  fontSize: 16,
  cursor: "pointer",
  letterSpacing: 1,
  boxShadow: "0 2px 10px #f0f0f0"
};

function Input({ label, value, onChange, type = "text", textarea }) {
  return (
    <div style={{ marginBottom: 17 }}>
      <label style={{
        display: "block", marginBottom: 6, fontWeight: "bold", color: "#444"
      }}>{label}:</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width: "100%",
            minHeight: 72,
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: 15
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: 15
          }}
        />
      )}
    </div>
  );
}

export default EventAdminPage;
