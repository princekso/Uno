// 📁 client/src/components/Card.jsx
import React from 'react';

function Card({ card, onPlay }) {
  const getColor = () => {
    switch (card.color) {
      case 'Red':
        return '#e74c3c';
      case 'Green':
        return '#2ecc71';
      case 'Blue':
        return '#3498db';
      case 'Yellow':
        return '#f1c40f';
      default:
        return '#bdc3c7';
    }
  };

  return (
    <div
      className="card"
      style={{ backgroundColor: getColor() }}
      onClick={() => onPlay(card)}
    >
      {card.value}
    </div>
  );
}

export default Card;
