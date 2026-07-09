import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ScoobyGulu from './pages/ScoobyGulu';
import CampusSelector from './components/CampusSelector';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <CampusSelector />
      <ScoobyGulu />
    </BrowserRouter>
  );
}

export default App;
