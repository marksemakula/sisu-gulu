import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ScoobyKatale from './pages/ScoobyKatale';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ScoobyKatale />
    </BrowserRouter>
  );
}

export default App;
