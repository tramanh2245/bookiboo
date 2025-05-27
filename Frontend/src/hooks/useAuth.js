import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../server/authService"; // Thay bằng path của bạn

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Lấy dữ liệu từ localStorage khi load lại trang
    try {
      return JSON.parse(localStorage.getItem("auth")) || {};
    } catch {
      return {};
    }
  });
  const navigate = useNavigate();

  // Khi auth thay đổi thì lưu vào localStorage
  useEffect(() => {
    if (auth && Object.keys(auth).length > 0) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  // Hàm đăng nhập
  const login = async (email, password) => {
    try {
      const userData = await authService.login(email, password);
      setAuth(userData); // userData chứa { user, token }
      return userData;
    } catch (error) {
      setAuth({});
      return false;
    }
  };

  // Hàm đăng ký
  const register = async (userData) => {
    try {
      const newUser = await authService.register(userData);
      return true;
    } catch (error) {
      return false;
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    setAuth({});
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
