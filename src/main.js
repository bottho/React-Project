import React from 'react';
import ReactDOM from 'react-dom';
import PlayerList from './Player';
require("!style-loader!css-loader!sass-loader!./style.scss");

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
      <PlayerList />,
    document.getElementById('mount')
  );
});
