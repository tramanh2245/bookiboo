import React from "react";

const ProfileDropdown = ({ username, onLogout }) => {
  return (
    <div className="profile-dropdown">
      <button
        className="profile-dropdown-btn profile-dropdown-username"
        disabled
        tabIndex={-1}
        style={{ marginBottom: 14 }}
      >
        {username}
      </button>
      <button
        className="profile-dropdown-btn"
        onClick={onLogout}
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default ProfileDropdown;
