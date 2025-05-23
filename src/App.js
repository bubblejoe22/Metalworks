import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart.js';
import Dashboard from './pages/Dashboard/Dashboard.js';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/ShoppingCart" element={<ShoppingCart />} />
        <Route path="/Dashboard" element={<Dashboard />} />

      </Routes>

    </Router>
  );
}

export default App;