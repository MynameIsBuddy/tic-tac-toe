import React from "react";

const LivesDisplay = ({ player, lives }) => (
  <div className="LivesDisplay">
    <p>
      {player === 'X' ? 'Player X' : 'Player O'} Lives: 
    </p>
    <p>
      {Array.from({ length: lives }, (_, i) => (
        <span key={i}>❤️</span>
      ))
       .map((_, i) => <span key={i}>&#9733;</span>)}
    </p>
  </div>
);

export default LivesDisplay;
