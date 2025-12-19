import React, { useState } from 'react';
import './Board.css';

const Board: React.FC = () => {
  const colors = [
    { name: 'Vert', color: '#22c55e', darkColor: '#16a34a' },
    { name: 'Bleu', color: '#3b82f6', darkColor: '#2563eb' },
    { name: 'Rouge', color: '#ef4444', darkColor: '#dc2626' },
    { name: 'Orange', color: '#f97316', darkColor: '#ea580c' }
  ];

  const [currentTurn, setCurrentTurn] = useState(0);
  const [takenGifts, setTakenGifts] = useState<Record<number, Set<number>>>({
    0: new Set(),
    1: new Set(),
    2: new Set(),
    3: new Set()
  });
  const [rotationMessage, setRotationMessage] = useState('');

  const handleGiftClick = (colorIndex: number, giftNumber: number) => {
    const newTakenGifts = { ...takenGifts };
    newTakenGifts[colorIndex] = new Set(takenGifts[colorIndex]);
    
    if (takenGifts[colorIndex].has(giftNumber)) {
      newTakenGifts[colorIndex].delete(giftNumber);
    } else {
      newTakenGifts[colorIndex].add(giftNumber);
      setCurrentTurn((currentTurn + 1) % 4);
    }
    
    setTakenGifts(newTakenGifts);
  };

  const handleRotation = (direction: 'left' | 'right') => {
    const message = direction === 'left' ? '🎅 Rotation à gauche !' : '🎅 Rotation à droite !';
    setRotationMessage(message);
    setTimeout(() => setRotationMessage(''), 2000);
  };

  const renderGrid = (colorIndex: number) => {
    const colorData = colors[colorIndex];
    const gifts = Array.from({ length: 25 }, (_, i) => i + 1);
    return (
      <div className="team-container">
        <div className="team-header" style={{ borderColor: colorData.color }}>
          <span className="gift-icon">🎁</span>
          <h3 style={{ color: colorData.darkColor }}>
            Lot {colorData.name}
          </h3>
          <span className="star-icon">⭐</span>
        </div>
        
        <div className="grid-container">
          <div className="grid">
            {gifts.map((num) => {
              if (num % 5 !== 0) {
              const isTaken = takenGifts[colorIndex].has(num);
              return (
                <button
                  key={num}
                  onClick={() => handleGiftClick(colorIndex, num)}
                  className={`gift-box ${isTaken ? 'taken' : ''}`}
                  style={{
                    background: isTaken 
                      ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                      : `linear-gradient(135deg, ${colorData.color} 0%, ${colorData.darkColor} 100%)`
                  }}
                >
                  {isTaken ? '✓' : num}
                </button>
              );
            }
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      <div className="snowflakes">
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
      </div>

      <div className="content">
        <div className="header">
          <div className="title-container">
            <span className="sparkle">✨</span>
            <h1 className="title">🎄 Jeu de Noël 🎅</h1>
            <span className="sparkle">✨</span>
          </div>
          

          {rotationMessage && (
            <div className="rotation-message">
              {rotationMessage}
            </div>
          )}
        </div>

        <div className="buttons-container">
          <button onClick={() => handleRotation('left')} className="rotation-btn left">
            ⬅️ Tourner à gauche
          </button>
          <button onClick={() => handleRotation('right')} className="rotation-btn right">
            Tourner à droite ➡️
          </button>
        </div>

        <div className="grids-container">
          {colors.map((_, index) => (
            <div key={index}>
              {renderGrid(index)}
            </div>
          ))}
        </div>

        <div className="stats-container">
          <div className="stats">
            <h3 className="stats-title">🎁 Cadeaux récupérés 🎁</h3>
            <div className="stats-grid">
              {colors.map((color, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number" style={{ color: color.darkColor }}>
                    {takenGifts[index].size}
                  </div>
                  <div className="stat-label">{color.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;