// 📁 client/src/components/Lobby.jsx
import React, { useState } from 'react';

function Lobby({ setPlayer, setRoom }) {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');

  const handleJoin = () => {
    if (name.trim() && roomCode.trim()) {
      setPlayer(name.trim());
      setRoom(roomCode.trim());
    }
  };

  return (
    <div>
      <input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Enter room code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <button onClick={handleJoin}>Join Game</button>
    </div>
  );
}

export default Lobby;
