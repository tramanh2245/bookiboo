import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const WELCOME = "Xin chào! Tôi là Bookiboo. Bạn cần hỏi gì về sách, nuôi dạy trẻ, hoặc bất cứ lĩnh vực nào?";

const ChatGeminiTab = () => {
  const [messages, setMessages] = useState([
    { from: "gemini", text: WELCOME }
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef();

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getAIReply = async (userText) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/bookiboo/Backend/openrouter_proxy.php",
        { prompt: userText }
      );
      if (response.data?.error) {
        return `Lỗi AI: ${response.data.error}`;
      }
      const answer = response.data?.choices?.[0]?.message?.content;
      return answer || "Không nhận được phản hồi từ AI.";
    } catch (error) {
      return "Lỗi khi kết nối AI API qua PHP backend.";
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages((m) => [...m, { from: "user", text: chatInput }]);
    setChatInput("");
    const aiReply = await getAIReply(chatInput);
    setMessages((m) => [...m, { from: "gemini", text: aiReply }]);
  };

  return (
    <div
      className="chatbox-content"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: 0, // Cho phép co dãn khi overflowY
      }}
    >
      <div className="messages" style={{
        flex: 1,
        overflowY: 'auto',
        padding: 14
      }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
              background: msg.from === "user" ? "#ef6800" : "#f2ecff",
              color: msg.from === "user" ? "#fff" : "#222",
              borderRadius: msg.from === "user"
                ? "18px 18px 4px 18px"
                : "18px 18px 18px 4px",
              marginBottom: 9,
              maxWidth: "78%",
              padding: "10px 13px",
              wordBreak: "break-word",
              marginLeft: msg.from === "user" ? "auto" : 0,
              fontSize: 16,
            }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form className="chatInputForm" onSubmit={handleSend} style={{
        display: 'flex',
        gap: 7,
        padding: 13,
        borderTop: '1px solid #eee',
        background: '#fff'
      }}>
        <input
          type="text"
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          placeholder="Nhập câu hỏi cho AI..."
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ddd"
          }}
        />
        <button
          type="submit"
          style={{
            padding: "9px 18px",
            background: "#ef6800",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontWeight: 500,
            cursor: "pointer"
          }}
        >
          Gửi
        </button>
      </form>
    </div>
  );
};

export default ChatGeminiTab;
