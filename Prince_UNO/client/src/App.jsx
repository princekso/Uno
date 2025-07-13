// 📁 client/src/App.jsx
import React, { useState } from 'react';
import Lobby from './components/Lobby';
import Game from './components/Game';

function App() {
  const [player, setPlayer] = useState(null);
  const [room, setRoom] = useState(null);

  return (
    <div className="app">
      <h1 className="title">🎴 Prince UNO</h1>
      {!player || !room ? (
        <Lobby setPlayer={setPlayer} setRoom={setRoom} />
      ) : (
        <Game player={player} room={room} />
      )}
    </div>
  );
}

export default App;
