import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './Game/Game';
import GameSetUp from './GameSetUp/GameSetUp';
import { io } from 'socket.io-client';
import Socket from './socket';
// import { v4 as uuid } from 'uuid';

const socket = io('http://localhost:3001');

function App() {
  return (
    <Socket.Provider value={socket}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<GameSetUp />} />
            <Route path="/room/:roomId" element={<Game />} />
          </Routes>
        </Router>
      </div>
    </Socket.Provider>
  );
}

export default App;
