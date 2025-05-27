import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth"; // hoặc context bạn dùng
import "./ProfilePage.css";

const ProfilePage = () => {
  const { auth } = useAuth(); // Lấy từ context hoặc redux (auth.user,...)
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Nếu đã có user trong context
    if (auth?.user) {
      setProfile(auth.user);
    }
    // Nếu chỉ có token thì gọi API lấy profile
    // else {
    //   fetch("/api/me", { headers: { Authorization: `Bearer ${auth.token}` } })
    //     .then(res => res.json())
    //     .then(data => setProfile(data.user));
    // }
  }, [auth]);

  if (!profile) return <div>Đang tải thông tin...</div>;

  return (
    <div className="profile-container">
      <h1>Thông tin cá nhân</h1>
      <div className="profile-card">
        <div className="profile-row">
          <span className="profile-label">Họ tên:</span>
          <span>{profile.name || profile.fullname || "Chưa cập nhật"}</span>
        </div>
        <div className="profile-row">
          <span className="profile-label">Email:</span>
          <span>{profile.email}</span>
        </div>
        <div className="profile-row">
          <span className="profile-label">Số điện thoại:</span>
          <span>{profile.phone || "Chưa cập nhật"}</span>
        </div>
        <div className="profile-row">
          <span className="profile-label">Ngày sinh:</span>
          <span>{profile.dob || "Chưa cập nhật"}</span>
        </div>
        <div className="profile-row">
          <span className="profile-label">Địa chỉ:</span>
          <span>{profile.address || "Chưa cập nhật"}</span>
        </div>
      </div>
      {/* Bạn có thể thêm nút Đổi mật khẩu, Cập nhật thông tin tại đây */}
    </div>
  );
};

export default ProfilePage;
