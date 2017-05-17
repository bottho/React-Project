import React from 'react';
import ReactDOM from 'react-dom';
import PlayerList from './Player';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <PlayerList />,
    document.getElementById('mount')
  );
});
