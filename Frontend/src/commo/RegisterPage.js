import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
    newsletter: true,
  });
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.password.trim() || !form.confirmPassword.trim()) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }
    if (!form.agree) {
      setError("Bạn phải đồng ý với Điều khoản và Chính sách bảo mật!");
      return;
    }

    setRegistering(true);
    try {
      const response = await register({
        name: form.name,
        email: form.email,
        password: form.password,
        newsletter: form.newsletter,
      });

      // --- CHỈ XỬ LÝ THÀNH CÔNG TẠI ĐÂY ---
      if (
        response &&
        (
          response.success === true ||
          (response.message && response.message.toLowerCase().includes("registration successful")) ||
          (response.message && response.message.includes("Đăng ký thành công"))
        )
      ) {
        setError("");
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        navigate("/login");
        return;
      }

      // --- CHỈ XỬ LÝ LỖI Ở DƯỚI ---
      if (response && response.error) {
        setError(response.error);
      } else {
        setError("Đăng ký thất bại. Email có thể đã được sử dụng!");
      }
    } catch (err) {
      setError("Đăng ký thất bại! " + (err.message || ""));
    }
    setRegistering(false);
  };

  return (
    <div style={{
      width: 400, margin: "40px auto", background: "#fff", borderRadius: 12,
      boxShadow: "0 2px 12px #ccc", padding: 32, position: "relative"
    }}>
      <h2 style={{ fontWeight: 700, marginBottom: 20 }}>Create Account</h2>
      {error && (
        <div style={{ color: "red", marginBottom: 14, textAlign: "center" }}>{error}</div>
      )}
      <form onSubmit={handleSubmit} autoComplete="off">
        <div style={{ marginBottom: 14 }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
            autoComplete="name"
          />
        </div>
        <div style={{ marginBottom: 14 }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
            autoComplete="username"
          />
        </div>
        <div style={{ marginBottom: 14 }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={inputStyle}
            autoComplete="new-password"
          />
        </div>
        <div style={{ marginBottom: 14 }}>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            style={inputStyle}
            autoComplete="new-password"
          />
        </div>
        {/* Checkbox 1: Agree to policy */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            id="agree"
            style={{ width: 18, height: 18, marginRight: 8 }}
          />
          <label htmlFor="agree" style={{ fontSize: 15 }}>
            By continuing, I agree to bookiboo Terms of Service and acknowledge bookiboo Privacy Policy.
          </label>
        </div>
        {/* Checkbox 2: Newsletter */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
          <input
            type="checkbox"
            name="newsletter"
            checked={form.newsletter}
            onChange={handleChange}
            id="newsletter"
            style={{ width: 18, height: 18, marginRight: 8 }}
          />
          <label htmlFor="newsletter" style={{ fontSize: 15 }}>
            Sign up for the bookiboo newsletter to receive books lists, events info, special offers, and more. You can unsubscribe at any time.
          </label>
        </div>
        <button
          type="submit"
          disabled={registering}
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
            cursor: registering ? "not-allowed" : "pointer",
            opacity: registering ? 0.7 : 1
          }}
        >
          Create Account
        </button>
      </form>
      <div style={{ textAlign: "center", marginTop: 8 }}>
        <span>Already have an account?{" "}
          <span
            style={{ color: "#111", fontWeight: 600, cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >Log In</span>
        </span>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "18px 14px",
  borderRadius: 8,
  border: "none",
  background: "#eee",
  fontSize: 17,
  marginBottom: 2,
  outline: "none"
};

export default RegisterPage;
