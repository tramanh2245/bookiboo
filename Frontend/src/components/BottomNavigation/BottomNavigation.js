import React, { useState } from 'react';
import styles from './BottomNavigation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ChatGeminiOverlay from '../ChatGeminiTab/ChatGeminiOverlay';

const BottomNavigation = () => {
  const { auth } = useAuth();
  const isLoggedIn = !!auth?.token;
  const username = auth?.user?.name || auth?.user?.email || "";
  const shortUsername = username.length > 16 ? username.slice(0, 14) + '…' : username;
  const [openSearchChat, setOpenSearchChat] = useState(false);

  return (
    <>
      <footer className={styles.bottomNav}>
        <nav>
          <ul className={styles.navIcons}>
            <li>
              <Link to="/" aria-label="Trang chủ" className={styles.iconButton}>
                <FontAwesomeIcon icon={faHome} />
              </Link>
            </li>
            <li>
              <button
                type="button"
                aria-label="Search hoặc Chat AI"
                className={styles.iconButton}
                onClick={() => setOpenSearchChat(true)}
                style={{ background: "none", border: "none", padding: 0 }}
              >
                <img src="/img/ai.png" alt="AI" style={{ width: 30, height: 30, borderRadius: "50%" }} />
              </button>
            </li>
            <li>
              <Link
                to={isLoggedIn ? "/profile" : "/login"}
                aria-label={isLoggedIn ? `Trang cá nhân của ${shortUsername}` : "Đăng nhập hoặc đăng ký"}
                className={styles.iconButton}
              >
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
      <ChatGeminiOverlay open={openSearchChat} onClose={() => setOpenSearchChat(false)} />
    </>
  );
};

export default BottomNavigation;
