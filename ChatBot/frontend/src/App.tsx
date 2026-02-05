import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const sessionId = localStorage.getItem("sessionId");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/chat/message", {
        message: input,
        sessionId,
      });

      localStorage.setItem("sessionId", res.data.sessionId);

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: res.data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Something went wrong. Try again." },
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="app">
      <div className="sidebar">
        <h2>Spur AI</h2>
        <p>Smart Assistant</p>
      </div>

      <div className="chat-wrapper">
        <div className="chat-header">
          <div className="ai-avatar">AI</div>
          <div>
            <h3>AI Assistant</h3>
            <span>Online</span>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-row ${
                msg.sender === "user" ? "user-row" : "ai-row"
              }`}
            >
              {msg.sender === "ai" && <div className="avatar">AI</div>}

              <div
                className={`message ${
                  msg.sender === "user" ? "user" : "ai"
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === "user" && <div className="avatar user">U</div>}
            </div>
          ))}

          {loading && (
            <div className="message-row ai-row">
              <div className="avatar">AI</div>
              <div className="message ai typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={bottomRef}></div>
        </div>

        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask me anything..."
          />
          <button onClick={sendMessage} disabled={loading}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;