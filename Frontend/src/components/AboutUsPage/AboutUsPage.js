import React from "react";
import styles from "./AboutUsPage.module.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook, faYoutube, faInstagram, faTiktok
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope, faPhone, faLocationDot
} from "@fortawesome/free-solid-svg-icons";

// Đổi đường dẫn ảnh banner theo ảnh bạn có!
const BANNER_IMG = "/img/aboutus.jpg";

const introParagraphs = [
  "Chào mừng bạn đến với Bookiboo – Thế giới sách rực rỡ dành riêng cho các bé! Tại Bookiboo, chúng tôi tin rằng mỗi cuốn sách là một phép màu, mở ra chân trời trí tưởng tượng và yêu thương cho trẻ nhỏ.",
  "Bookiboo ra đời với sứ mệnh đồng hành cùng bố mẹ vun đắp niềm đam mê đọc sách cho các bé từ những năm tháng đầu đời. Chúng tôi tuyển chọn tỉ mỉ các đầu sách tranh truyện, sách kỹ năng, sách tương tác và cả những cuốn sách đa ngôn ngữ phù hợp từng độ tuổi, giúp bé phát triển trí tuệ, cảm xúc và kỹ năng sống.",
  "Đội ngũ Bookiboo luôn sẵn sàng tư vấn, chia sẻ kinh nghiệm nuôi dưỡng thói quen đọc và tổ chức nhiều hoạt động sáng tạo – từ giờ kể chuyện, workshop tương tác cho đến các sự kiện giao lưu với tác giả nhí. Hãy cùng Bookiboo xây dựng tuổi thơ hạnh phúc cho các bé với thật nhiều ký ức đẹp bên những trang sách!"
];

const AboutUsPage = () => (
  <div className={styles.aboutWrapper}>
    {/* Banner trên cùng */}
    <motion.div
      className={styles.bannerBox}
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <img src={BANNER_IMG} alt="Giới thiệu Bookiboo" className={styles.bannerImg} />
    </motion.div>
    {/* Phần đầu - giới thiệu sinh động */}
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={styles.introMotion}
    >
      <motion.h1
        className={styles.pageTitle}
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
      >
        Giới thiệu về Bookiboo
      </motion.h1>
      <div className={styles.introParagraphs}>
        {introParagraphs.map((text, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.46, delay: 0.2 + idx * 0.16 }}
            className={styles.introParagraph}
          >
            {text}
          </motion.p>
        ))}
      </div>
    </motion.div>
    {/* Phần lưới 4 cột */}
    <div className={styles.gridContainer}>
      {/* Cột logo + giới thiệu */}
      <div className={styles.col1}>
        <img src="/img/a7.jpg" alt="Bookiboo" className={styles.logo} />
        <div className={styles.companyText}>
          <b>Bookiboo - Sách cho các bé</b><br />
          Công ty TNHH Phát triển Văn hóa Bookiboo<br />
          Địa chỉ: 123 Đường Sách, Q.1, TP.HCM<br />
          Bookiboo.vn mang đến thế giới sách tranh, truyện kể, kỹ năng cho trẻ em.<br />
          Hỗ trợ đặt online - giao hàng toàn quốc.<br />
          <span style={{color:"#cb2530", fontWeight:600}}>Không tiếp nhận nhận hàng trực tiếp tại văn phòng.</span>
        </div>
        <div className={styles.socialIcons}>
          <a href="https://facebook.com/bookiboo.vn" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://instagram.com/bookiboo.vn" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://tiktok.com/@bookiboo" target="_blank" rel="noopener noreferrer" aria-label="Tiktok">
            <FontAwesomeIcon icon={faTiktok} />
          </a>
          <a href="https://youtube.com/@bookiboo" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
      </div>

      {/* Cột dịch vụ */}
      <div className={styles.col2}>
        <div className={styles.colTitle}>DỊCH VỤ</div>
        <ul>
          <li>Giới thiệu Bookiboo</li>
          <li>Câu chuyện về Bookiboo</li>
          <li>Chính sách bảo mật thông tin</li>
          <li>Chính sách thanh toán</li>
          <li>Điều khoản sử dụng</li>
        </ul>
      </div>

      {/* Cột hỗ trợ */}
      <div className={styles.col3}>
        <div className={styles.colTitle}>HỖ TRỢ</div>
        <ul>
          <li>Chính sách đổi/trả/hoàn tiền</li>
          <li>Chính sách vận chuyển</li>
          <li>Chính sách bảo hành</li>
          <li>Chương trình khách hàng thân thiết</li>
        </ul>
        <div className={styles.shippingPartners}>
          <img src="/img/GHTK.png" alt="GHN" />
          <img src="/img/j&t.png" alt="LEX" />
          <img src="/img/vnpost1.jpg" alt="Viettel Post" />
        </div>
      </div>

      {/* Cột tài khoản của bạn */}
      <div className={styles.col4}>
        <div className={styles.colTitle}>TÀI KHOẢN CỦA BẠN</div>
        <ul>
          <li>Đăng nhập / Đăng ký</li>
          <li>Địa chỉ giao hàng</li>
          <li>Thông tin tài khoản</li>
          <li>Lịch sử đặt hàng</li>
        </ul>
        <div className={styles.paymentPartners}>
          <img src="/img/vnpay.jpg" alt="VNPAY" />
          <img src="/img/momopay.jpg" alt="Momo" />
          <img src="/img/zalopay.jpg" alt="ZaloPay" />
        </div>
      </div>
    </div>
    {/* Thông tin cuối trang */}
    <div className={styles.bottomNote}>
      <div>
        <FontAwesomeIcon icon={faLocationDot} /> 123 Đường Sách, Q.1, TP.HCM &nbsp;|&nbsp;
        <FontAwesomeIcon icon={faEnvelope} /> hello@bookiboo.vn &nbsp;|&nbsp;
        <FontAwesomeIcon icon={faPhone} /> 0909 123 456
      </div>
      <div>
        Giấy chứng nhận ĐKKD số 0312345678 do Sở KHĐT TP.HCM cấp ngày 01/01/2020. <br />
        &copy; {new Date().getFullYear()} Bookiboo.vn
      </div>
    </div>
  </div>
);

export default AboutUsPage;
