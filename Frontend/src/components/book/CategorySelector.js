import React from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { key: 'lam-quen-voi-sach', label: 'Làm quen với sách', icon: '/img/a2.jpg' },
  { key: 'phat-trien-quan-sat', label: 'Phát triển quan sát', icon: '/img/a3.jpg' },
  { key: 'phat-trien-sang-tao', label: 'Phát triển sáng tạo', icon: '/img/a4.jpg' },
  { key: 'phat-trien-tu-duy', label: 'Phát triển tư duy', icon: '/img/a5.jpg' }
];

const styles = {
  selector: {
    background: "#fff9f1",
    borderRadius: 24,
    padding: "28px 12px 22px 12px",
    maxWidth: 860,
    margin: "16px auto 0 auto", // SÁT banner
    boxShadow: "0 6px 32px 0 rgba(255,183,77,0.12)",
    textAlign: "center",
  },
  title: {
    fontSize: "1.36rem",
    fontWeight: "bold",
    color: "#fd853a",
    marginBottom: 26,
    letterSpacing: "0.5px",
  },
  list: {
    display: "flex",
    gap: 34,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  item: {
    background: "linear-gradient(135deg, #fffbe7 85%, #ffecd2 100%)",
    borderRadius: 18,
    boxShadow: "0 4px 18px 0 rgba(253, 133, 58, 0.06)",
    padding: "28px 12px 18px 12px",
    cursor: "pointer",
    transition: "transform 0.19s, box-shadow 0.18s, border 0.18s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 150,
    minHeight: 150,
    border: "2px solid transparent",
    position: "relative",
  },
  itemHover: {
    transform: "translateY(-10px) scale(1.07)",
    boxShadow: "0 8px 36px 0 rgba(253, 133, 58, 0.13)",
    border: "2px solid #fd853a",
    background: "linear-gradient(135deg, #ffecd2 55%, #ffe0b2 100%)",
  },
  icon: {
    width: 88,
    height: 88,
    objectFit: "cover",
    borderRadius: "50%",
    marginBottom: 16,
    background: "#ffe0b2",
    border: "2.5px solid #fd853a40",
    boxShadow: "0 2px 12px 0 rgba(253,133,58,0.04)",
    transition: "border 0.2s",
  },
  iconHover: {
    border: "2.5px solid #fd853a",
  },
  label: {
    fontSize: "1.11rem",
    color: "#ff9800",
    fontWeight: 500,
    marginTop: 6,
    letterSpacing: "0.21px",
    textAlign: "center",
    transition: "color 0.16s",
  },
  labelHover: {
    color: "#fd853a",
  },
};

const CategorySelector = () => {
  const navigate = useNavigate();
  const [hoverIdx, setHoverIdx] = React.useState(-1);

  // Responsive nhỏ hơn trên mobile
  const responsiveList = window.innerWidth <= 700
    ? { ...styles.list, flexDirection: "column", alignItems: "center", gap: 18 }
    : styles.list;

  return (
    <div style={styles.selector}>
      <div style={styles.title}>Chọn sách nào cho bé?</div>
      <div style={responsiveList}>
        {CATEGORIES.map((cat, idx) => (
          <div
            key={cat.key}
            style={{
              ...styles.item,
              ...(hoverIdx === idx ? styles.itemHover : {}),
              ...(window.innerWidth <= 700
                ? { width: "90vw", maxWidth: 300, minWidth: 0, padding: "18px 6px" }
                : {}),
            }}
            onClick={() => navigate(`/category/${cat.key}`)}
            onMouseEnter={() => setHoverIdx(idx)}
            onMouseLeave={() => setHoverIdx(-1)}
            tabIndex={0}
          >
            <img
              src={cat.icon}
              alt={cat.label}
              style={{
                ...styles.icon,
                ...(hoverIdx === idx ? styles.iconHover : {}),
              }}
            />
            <div
              style={{
                ...styles.label,
                ...(hoverIdx === idx ? styles.labelHover : {}),
              }}
            >
              {cat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
