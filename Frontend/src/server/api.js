// src/server/api.js
const BASE_URL = "http://localhost:8080/bookiboo/Backend/api.php";

// ============ BOOK ADMIN ============ //
export const getAllBooks = async () => {
  try {
    const res = await fetch(`${BASE_URL}?resource=admin&action=getBooks`, {
      method: 'GET'
    });
    const contentType = res.headers.get('Content-Type');
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP error! Status: ${res.status}, Content: ${text}`);
    }
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      throw new Error(`Expected JSON, but received ${contentType}: ${text}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sách:", error);
    throw error;
  }
};

export const addBook = async (token, formData) => {
  try {
    const res = await fetch(`${BASE_URL}?resource=admin&action=addBook`, {
      method: 'POST',
      body: formData
    });
    const contentType = res.headers.get('Content-Type');
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP error! Status: ${res.status}, Content: ${text}`);
    }
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      throw new Error(`Expected JSON, but received ${contentType}: ${text}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi thêm sách:", error);
    throw error;
  }
};

export const updateBook = async (token, formData) => {
  try {
    const res = await fetch(`${BASE_URL}?resource=admin&action=updateBook`, {
      method: 'POST',
      body: formData
    });
    const contentType = res.headers.get('Content-Type');
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP error! Status: ${res.status}, Content: ${text}`);
    }
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      throw new Error(`Expected JSON, but received ${contentType}: ${text}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi cập nhật sách:", error);
    throw error;
  }
};

export const deleteBook = async (token, bookId) => {
  try {
    const res = await fetch(`${BASE_URL}?resource=admin&action=deleteBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: bookId })
    });
    const contentType = res.headers.get('Content-Type');
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP error! Status: ${res.status}, Content: ${text}`);
    }
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      throw new Error(`Expected JSON, but received ${contentType}: ${text}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi xóa sách:", error);
    throw error;
  }
};


// ============ USER ADMIN ============ //
export const getAllUsers = async (token) => {
  const res = await fetch(`${BASE_URL}?resource=admin&action=getUsers`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return await res.json();
};

export const addUser = async (formData) => {
  const res = await fetch(`${BASE_URL}?resource=admin&action=addUser`, {
    method: "POST",
    body: formData
  });
  return await res.json();
};

export const updateUser = async (formData) => {
  const res = await fetch(`${BASE_URL}?resource=admin&action=updateUser`, {
    method: "POST",
    body: formData
  });
  return await res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${BASE_URL}?resource=admin&action=deleteUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });
  return await res.json();
};

// ============ CATEGORY ============ //
export const getAllCategories = async () => {
  const res = await fetch(`${BASE_URL}?resource=admin&action=getAllCategories`);
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Lỗi lấy danh mục");
  return data.data;
};


// ============ DASHBOARD ============ //
export const getDashboardStats = async (token) => {
  const res = await fetch(`${BASE_URL}?resource=admin&action=getDashboard`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return await res.json();
};

// ============ ORDER ADMIN ============ //
export const getAllOrders = async (token) => {
  const res = await fetch(`${BASE_URL}?resource=admin&action=getOrders`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return await res.json();
};

export const updateOrderStatus = async (token, orderId, newStatus) => {
  const res = await fetch(`${BASE_URL}?resource=admin&action=updateOrderStatus`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ order_id: orderId, status: newStatus })
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return await res.json();
};

export const deleteOrder = async (token, orderId) => {
  const res = await fetch(`${BASE_URL}?resource=admin&action=deleteOrder`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ order_id: orderId })
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return await res.json();
};


// ============ AUTH ============ //
export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}?resource=auth&action=login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Login failed");
  return data;
};

export const register = async ({ name, email, password, newsletter }) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("newsletter", newsletter ? "1" : "0");

  const res = await fetch(`${BASE_URL}?resource=auth&action=register`, {
    method: "POST",
    body: formData,
  });

  const contentType = res.headers.get('Content-Type');
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }
  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Expected JSON but got: ${contentType}: ${text}`);
  }
  const data = await res.json();
  return data.success;
};


// ============ USER GET BOOK ============ //
export const getBooksByCategory = async (categoryKey) => {
  const response = await fetch(
    `${BASE_URL}?resource=user&action=getBooksByCategory&category=${categoryKey}`
  );
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP error! Status: ${response.status}, Content: ${text}`);
  }
  const data = await response.json();
  return data;
};


// ============ USER GET EVENTS PUBLIC ============ //
export async function getEvents() {
  const res = await fetch(`${BASE_URL}?resource=event&action=getAll`);
  if (!res.ok) throw new Error("API error");
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}


// ============ EVENT ADMIN (CRUD) ============ //
export async function getAllEventsAdmin() {
  const res = await fetch(`${BASE_URL}?resource=admin&action=getEvents`);
  return await res.json();
}
// Nhận luôn FormData, không tạo mới nữa!
export async function addEventAdmin(formData) {
  const res = await fetch(`${BASE_URL}?resource=admin&action=addEvent`, {
    method: 'POST',
    body: formData,
  });
  return await res.json();
}

export async function updateEventAdmin(formData) {
  const res = await fetch(`${BASE_URL}?resource=admin&action=updateEvent`, {
    method: 'POST',
    body: formData,
  });
  return await res.json();
}

// XÓA SỰ KIỆN BẰNG POST (FormData)
export async function deleteEventAdmin(id) {
  const formData = new FormData();
  formData.append('id', id);
  const res = await fetch(`${BASE_URL}?resource=admin&action=deleteEvent`, {
    method: 'POST', // Sử dụng POST cho ổn định
    body: formData,
  });
  return await res.json();
}

