import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ScoobyGulu from './pages/ScoobyGulu';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ScoobyGulu />
    </BrowserRouter>
  );
}

export default App;
