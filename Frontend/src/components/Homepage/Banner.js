import React from "react";
import "./Banner.css"; // import file css vừa tạo

const Banner = () => (
  <div className="banner-section">
    <video
      src="/img/tiny.mp4"
      className="banner-video"
      autoPlay
      loop
      muted
      playsInline
    />
    <div className="banner-overlay">
      <h1 className="banner-title">Chào mừng đến với Thế giới Sách cho Bé!</h1>
      <p className="banner-desc">
        Nơi khơi nguồn tri thức và cảm hứng sáng tạo cho trẻ nhỏ.
      </p>
      <button
        className="banner-btn"
        onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
      >
        Khám phá sách
      </button>
    </div>
  </div>
);

export default Banner;
