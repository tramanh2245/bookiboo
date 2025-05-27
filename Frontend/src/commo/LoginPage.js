import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth"; 
import { useLocation, useNavigate } from "react-router-dom";

// Đảm bảo đúng path

const LoginPage = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(email, password);
    if (result && result.user?.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else if (result && result.user?.role === "user") {
      const redirectTo = location.state?.redirectTo || "/";
      navigate(redirectTo, { replace: true });
    } else {
      setError("Email hoặc mật khẩu không đúng!");
    }
  };
  
  

  const handleRegister = () => {
    navigate("/register"); // Điều hướng sang trang đăng ký, hoặc đổi lại nếu bạn muốn popup khác
  };

  return (
    <div style={{
      width: 400,
      margin: "60px auto",
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 12px #ccc",
      padding: 32,
      position: "relative"
    }}>
      {/* Nút đóng popup */}
      {onClose && (
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 20, right: 20,
            background: "transparent", border: "none", fontSize: 28, cursor: "pointer"
          }}
          aria-label="Close"
        >
          ×
        </button>
      )}

      <h2 style={{ fontWeight: 700, marginBottom: 24 }}>Log In</h2>
      {error && (
        <div style={{ color: "red", marginBottom: 12, textAlign: "center" }}>{error}</div>
      )}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 18 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="username"
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "18px 14px",
              borderRadius: 8,
              border: "none",
              background: "#eee",
              fontSize: 17,
              marginBottom: 2,
              outline: "none"
            }}
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "18px 14px",
              borderRadius: 8,
              border: "none",
              background: "#eee",
              fontSize: 17,
              marginBottom: 2,
              outline: "none"
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "16px 0",
            border: "none",
            borderRadius: 6,
            background: "#e12727",
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 14,
            cursor: "pointer",
            transition: "background 0.2s"
          }}
        >
          Login
        </button>
      </form>
      <button
        onClick={handleRegister}
        style={{
          width: "100%",
          padding: "14px 0",
          border: "2px solid #8d8d8d",
          borderRadius: 6,
          background: "#fff",
          color: "#111",
          fontSize: 20,
          fontWeight: "bold",
          cursor: "pointer",
          transition: "background 0.2s"
        }}
      >
        Create An Account
      </button>
    </div>
  );
};

export default LoginPage;
