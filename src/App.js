import React, { Component } from 'react';
import logo from './logo.svg';
import { Game } from './components/game';

import './App.css';
import './stylesheet/board.css';
import './stylesheet/game.css';
import './stylesheet/sequare.css';

class App extends Component {
  render() {
    return (
      <div>
        <Game />
      </div>
    );
  }
}

export default App;
