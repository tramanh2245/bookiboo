import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { getBooksByCategory, getEvents } from "../../server/api";
import Banner from "./Banner";
import CategorySelector from "../book/CategorySelector";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BookCard from "../book/BookCard"; // Đảm bảo đúng path import

// Chuẩn hóa danh mục để vừa có label vừa có key cho router
const CATEGORY_MENU_ITEMS = [
  { label: "Làm quen với sách (0-1 tuổi)", key: "lam-quen-voi-sach" },
  { label: "Phát triển sáng tạo (2-3 tuổi)", key: "phat-trien-sang-tao" },
  { label: "Phát triển tư duy (4-5 tuổi)", key: "phat-trien-tu-duy" },
  { label: "Phát triển quan sát (6+ tuổi)", key: "phat-trien-quan-sat" },
  { label: "Xem tất cả...", key: "" },
];

const AGE_CATEGORIES = [
  {
    age: "0-1 tuổi",
    category: "lam-quen-voi-sach",
    label: "1 Làm quen với sách",
    color: "#ffe0b2",
    menu: CATEGORY_MENU_ITEMS,
  },
  {
    age: "2-3 tuổi",
    category: "phat-trien-tu-duy",
    label: "2 Phát triển tư duy",
    color: "#ffe0b2",
    menu: CATEGORY_MENU_ITEMS,
  },
  {
    age: "4-5 tuổi",
    category: "phat-trien-sang-tao",
    label: "3 Phát triển sáng tạo",
    color: "#ffe0b2",
    menu: CATEGORY_MENU_ITEMS,
  },
  {
    age: "6+ tuổi",
    category: "phat-trien-sang-tao",
    label: "4 Khám phá thế giới",
    color: "#ffe0b2",
    menu: CATEGORY_MENU_ITEMS,
  },
];

const sectionMotion = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, type: "spring", bounce: 0.15 },
  viewport: { once: true, amount: 0.15 }
};

const HomePage = () => {
  // Mỗi section chỉ hiển thị danh sách sách mặc định của category đó
  const [sections, setSections] = useState(
    AGE_CATEGORIES.map(() => ({ books: [], loading: true }))
  );
  const [events, setEvents] = useState([]);
  const [eventLoading, setEventLoading] = useState(true);

  useEffect(() => {
    AGE_CATEGORIES.forEach((cat, idx) => {
      getBooksByCategory(cat.category)
        .then(data => {
          setSections(secs => {
            const clone = [...secs];
            clone[idx] = { books: data || [], loading: false };
            return clone;
          });
        })
        .catch(() => {
          setSections(secs => {
            const clone = [...secs];
            clone[idx] = { books: [], loading: false };
            return clone;
          });
        });
    });
    getEvents()
      .then(data => setEvents(data && data.length ? data : []))
      .catch(() => setEvents([]))
      .finally(() => setEventLoading(false));
  }, []);

  return (
    <div className="homepage-age-sole">
      <Banner />
      <CategorySelector />
      {AGE_CATEGORIES.map((cat, idx) => (
        <motion.div
          key={cat.label}
          className="zigzag-row"
          initial={sectionMotion.initial}
          whileInView={sectionMotion.whileInView}
          transition={sectionMotion.transition}
          viewport={sectionMotion.viewport}
        >
          {idx % 2 === 0 ? (
            <>
              <SidebarBlock cat={cat} idx={idx} menu={cat.menu} />
              <div className="zigzag-books">
                <BooksGrid books={sections[idx]?.books} loading={sections[idx]?.loading} />
              </div>
            </>
          ) : (
            <>
              <div className="zigzag-books">
                <BooksGrid books={sections[idx]?.books} loading={sections[idx]?.loading} />
              </div>
              <SidebarBlock cat={cat} idx={idx} rightAlign menu={cat.menu} />
            </>
          )}
        </motion.div>
      ))}

      <motion.div
        initial={sectionMotion.initial}
        whileInView={sectionMotion.whileInView}
        transition={sectionMotion.transition}
        viewport={sectionMotion.viewport}
      >
        <EventSection events={events} loading={eventLoading} />
      </motion.div>
    </div>
  );
};

function SidebarBlock({ cat, idx, rightAlign, menu }) {
  return (
    <div className={`zigzag-sidebar-block ${rightAlign ? "align-left" : "align-right"}`}>
      {!rightAlign && <SidebarMenu age={cat.label} menu={menu} badge={idx + 1} />}
      <div className="zigzag-label" style={{ background: cat.color }}>
        <b>{cat.age}</b>
      </div>
      {rightAlign && <SidebarMenu age={cat.label} menu={menu} badge={idx + 1} />}
    </div>
  );
}

function SidebarMenu({ age, menu, badge }) {
  const navigate = useNavigate();
  return (
    <div className="sidebar-menu">
      <div className="sidebar-menu-title">{age}</div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {menu.map((item, i) => (
          <li
            key={item.key}
            className="sidebar-menu-item"
            onClick={() => navigate(`/category/${item.key}`)}
            style={{
              marginBottom: 10,
              padding: 14,
              borderRadius: 12,
              background: "#b17913",
              color: "#fff",
              fontWeight: 500,
              fontSize: 18,
              cursor: "pointer",
              transition: "all .16s"
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BooksGrid({ books, loading }) {
  if (loading)
    return <div style={{ textAlign: "center", width: "100%" }}>Đang tải sách...</div>;
  if (!books || books.length === 0)
    return <div style={{ color: "#aaa", fontStyle: "italic", padding: 20 }}>Chưa có sách!</div>;
  return (
    <div className="books-grid">
      {books.slice(0, 6).map((book, idx) => (
        <BookCard key={book.id || idx} book={book} />
      ))}
    </div>
  );
}

const EventSection = ({ events, loading }) => {
  const navigate = useNavigate();
  return (
    <div className="event-section">
      <div className="event-title" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 800, color: "#ff9800", fontSize: 36 }}>Sự kiện nổi bật</span>
        <button className="view-all-events-btn" onClick={() => navigate("/events")}>Xem tất cả</button>
      </div>
      {loading ? (
        <div style={{ textAlign: "center" }}>Đang tải sự kiện...</div>
      ) : (
        <div className="event-list-grid">
          {(events && events.length > 0 ? events.slice(0, 3) : []).map((ev, idx) => (
            <motion.div
              className="event-card"
              key={ev.id}
              onClick={() => navigate(`/event/${ev.id}`)}
              style={{ cursor: "pointer" }}
              tabIndex={0}
              title={ev.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15, type: "spring", bounce: 0.15 }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <img src={ev.image || ev.image_url} alt={ev.title} className="event-image" />
              <div className="event-name">{ev.title}</div>
              <div className="event-time">{ev.time || ev.date}</div>
            </motion.div>
          ))}
          {(!events || events.length === 0) && (
            <div style={{ textAlign: "center", width: "100%", padding: 30 }}>Chưa có sự kiện nổi bật.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
