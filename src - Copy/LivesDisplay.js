// LivesDisplay.js
import React from 'react';

const LivesDisplay = ({ player, lives }) => {
  const renderHearts = () => {
    return Array.from({ length: 3 }, (_, i) => (
      <span 
        key={i} 
        className={`heart ${i < lives ? 'active' : 'inactive'}`}
      >
        ❤️
      </span>
    ));
  };

  return (
    <div className={`lives-display player-${player.toLowerCase()}`}>
      <div className="player-label">
        Player {player}
      </div>
      <div className="lives-hearts">
        {renderHearts()}
      </div>
    </div>
  );
};

export default LivesDisplay;