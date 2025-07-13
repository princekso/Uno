// 📁 client/src/components/ChatBox.jsx
import React, { useState, useEffect } from 'react';

function ChatBox({ socket }) {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    socket.on('chat', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off('chat');
  }, [socket]);

  const send = () => {
    if (msg.trim()) {
      socket.emit('chat', msg);
      setMsg('');
    }
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>
      <input
        placeholder="Type a message..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && send()}
      />
    </div>
  );
}

export default ChatBox;
