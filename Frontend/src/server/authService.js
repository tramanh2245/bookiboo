const BASE_URL = "http://localhost:8080/bookiboo/Backend/api.php";

// Đăng nhập, trả về {token, user}
// authService.js
export async function login(email, password) {
  const response = await fetch("http://localhost:8080/bookiboo/Backend/api.php?resource=auth&action=login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    let message = "Login failed";
    try {
      const data = await response.json();
      message = data.message || message;
    } catch {}
    throw new Error(message);
  }

  // Nếu đăng nhập thành công, trả về data
  const data = await response.json();
  return data; // data chứa thông tin user (role, token...)
}


// Đăng ký (tùy backend)
export const register = async (userData) => {
  const res = await fetch(`${BASE_URL}?resource=auth&action=register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Register failed");
  return data;
};
