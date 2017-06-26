import React from 'react';
import ReactDOM from 'react-dom';
import PlayerList from './Player';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <div className="container">
      <PlayerList />
    </div>,
    document.getElementById('mount')
  );
});
