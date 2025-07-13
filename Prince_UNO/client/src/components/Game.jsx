// 📁 client/src/components/Game.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Card from './Card';
import ChatBox from './ChatBox';

const socket = io('https://backendserver-edki.onrender.com'); // Replace with Render/host URL

function Game({ player, room }) {
  const [hand, setHand] = useState([]);
  const [topCard, setTopCard] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(null);
  const [message, setMessage] = useState('');
  const [unoCalled, setUnoCalled] = useState(false);

  useEffect(() => {
    socket.emit('join', { player, room });

    socket.on('startGame', ({ hand, topCard, players }) => {
      setHand(hand);
      setTopCard(topCard);
      setPlayers(players);
    });

    socket.on('updateGame', ({ hand, topCard, players, currentTurn }) => {
      setHand(hand);
      setTopCard(topCard);
      setPlayers(players);
      setCurrentTurn(currentTurn);
    });

    socket.on('message', (msg) => {
      setMessage(msg);
      setTimeout(() => setMessage(''), 3000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const playCard = (card) => {
    socket.emit('playCard', { room, player, card });
  };

  const drawCard = () => {
    socket.emit('drawCard', { room, player });
  };

  const callUno = () => {
    setUnoCalled(true);
    socket.emit('uno', { room, player });
  };

  return (
    <div>
      <h2>Room: {room}</h2>
      <p>Players: {players.join(', ')}</p>
      <p>{currentTurn === player ? 'Your turn' : `Waiting for ${currentTurn}`}</p>
      <p style={{ color: 'orange' }}>{message}</p>
      {topCard && (
        <div style={{ marginBottom: '10px' }}>
          <strong>Top Card:</strong>
          <Card card={topCard} onPlay={() => {}} />
        </div>
      )}
      <div className="hand">
        {hand.map((card, idx) => (
          <Card key={idx} card={card} onPlay={playCard} />
        ))}
      </div>
      <div>
        <button onClick={drawCard}>Draw Card</button>
        <button onClick={callUno} disabled={unoCalled || hand.length !== 2}>
          Call UNO!
        </button>
      </div>
      <ChatBox socket={socket} />
    </div>
  );
}

export default Game;
