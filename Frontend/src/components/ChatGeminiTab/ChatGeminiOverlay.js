import React from "react";
import ChatGeminiTab from "../ChatGeminiTab/ChatGeminiTab";

const ChatGeminiOverlay = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(30,30,40,0.36)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          minWidth: 320,
          maxWidth: 420,
          width: "98vw",
          minHeight: 380,
          maxHeight: "80vh",
          boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
          position: "relative",
          display: "flex",
          overflow:"hidden",
          flexDirection: "column",
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 12, right: 12, background: "none",
            border: "none", fontSize: 22, color: "#e34", cursor: "pointer"
          }}
          aria-label="Đóng"
        >×</button>
        {/* KHÔNG truyền prop open vào ChatGeminiTab */}
        <ChatGeminiTab />
      </div>
    </div>
  );
};

export default ChatGeminiOverlay;
