import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../Cart/CartContext';
import { useAuth } from '../../hooks/useAuth';
import styles from './Header.module.css';

const LOGO_SRC = '/img/logo.jpg';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();
  const { auth, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const logoRef = useRef(null);

  const isLoggedIn = !!auth?.token;
  const username = auth?.user?.name || auth?.user?.email || "";
  const shortUsername = username.length > 16 ? username.slice(0, 14) + '…' : username;

  useEffect(() => {
    setIsProfileOpen(false);
  }, [location.pathname]);

  const openAuthModal = () => {
    navigate('/login');
  };

  return (
    <header className={styles.siteHeader} role="banner">
      <nav className={styles.headerNav} role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <div className={styles.logo} ref={logoRef}>
          <Link to="/" aria-label="Trang chủ">
            <img
              src={LOGO_SRC}
              alt="Logo BOOKIBOO"
              loading="lazy"
              width={42}
              height={42}
              style={{ borderRadius: 10 }}
            />
          </Link>
        </div>

        {/* Main Navigation Links */}
        <ul className={styles.categoryList} role="menubar">
          <li className={styles.hasMegaDropdown} role="none" tabIndex={0} aria-haspopup="true">
            <button
              type="button"
              aria-label="Danh mục sách"
              className={styles.navLink}
              tabIndex={0}
            >
              BOOKS
            </button>
            <div className={styles.megaDropdown} role="menu">
              <div className={styles.megaDropdownContent}>
                <div className={styles.dropdownColumns}>
                  <div className={styles.dropdownColumn}>
                    <h2><span role="img" aria-label="books">📚</span> Tất Cả Sách</h2>
                    <Link to="/allbooks" className={styles.viewAllLink} role="menuitem">
                      Xem Tất Cả Sách
                    </Link>
                  </div>
                  <div className={styles.dropdownColumn}>
                    <ul className={styles.dropdownList} role="menu">
                      <li role="menuitem">
                        <Link to="/category/lam-quen-voi-sach">
                          Làm quen với sách (0-1 tuổi)
                        </Link>
                      </li>
                      <li role="menuitem">
                        <Link to="/category/phat-trien-tu-duy">
                          Phát triển sáng tạo (2-3 tuổi)
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.dropdownColumn}>
                    <ul className={styles.dropdownList} role="menu">
                      <li role="menuitem">
                        <Link to="/category/phat-trien-sang-tao">
                          Phát triển tư duy (4-5 tuổi)
                        </Link>
                      </li>
                      <li role="menuitem">
                        <Link to="/category/phat-trien-quan-sat">
                          Phát triển quan sát (6+ tuổi)
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li role="none">
            <Link to="/events" className={styles.navLink} role="menuitem">EVENT</Link>
          </li>
          <li role="none">
            <Link to="/aboutus" className={styles.navLink} role="menuitem">ABOUT US</Link>
          </li>
        </ul>

        {/* Header Icons */}
        <div className={styles.headerIcons} ref={dropdownRef} role="toolbar" style={{ position: "relative" }}>
          <button
            className={styles.headerIconButton}
            aria-label="Chọn ngôn ngữ (chưa triển khai)"
            disabled
          >
            <FontAwesomeIcon icon={faGlobe} />
          </button>
          <Link to="/cart" className={styles.headerIconButton} aria-label="Xem giỏ hàng" style={{ position: "relative" }}>
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartItems.length > 0 && (
              <span className={styles.cartCountBadge}>{cartItems.length}</span>
            )}
          </Link>
          {/* User account icon with hover dropdown */}
          {isLoggedIn ? (
            <div
              style={{ display: "inline-block", position: "relative" }}
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <button
                className={styles.headerIconButton}
                aria-label={`Tài khoản của ${shortUsername || 'User'}`}
                style={{ display: "flex", alignItems: "center" }}
                type="button"
                tabIndex={0}
              >
                <FontAwesomeIcon icon={faUser} />
                <span className={styles.username} style={{ marginLeft: 8 }}>
                  {shortUsername}
                </span>
              </button>
              {isProfileOpen && (
                <div style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 5px)",
                  zIndex: 500,
                  minWidth: 140,
                }}>
                  <div className={styles.profileDropdown}>
                    <button
                      className={styles.profileDropdownBtn}
                      style={{
                        marginBottom: 10,
                        fontSize: "1.08rem",
                        fontWeight: 600,
                        padding: "9px 0",
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        if (auth?.user?.role === "admin") {
                          navigate("/admin");
                        } else {
                          navigate("/profile");
                        }
                        setIsProfileOpen(false);
                      }}
                    >{username}</button>
                    <button
                      className={styles.profileDropdownBtn}
                      style={{
                        fontSize: "1.08rem",
                        padding: "11px 0"
                      }}
                      onClick={() => {
                        if (window.confirm("Bạn có muốn đăng xuất?")) logout();
                      }}
                    >Đăng xuất</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className={styles.headerIconButton}
              aria-label="Đăng nhập hoặc đăng ký"
              type="button"
            >
              <FontAwesomeIcon icon={faUser} />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
