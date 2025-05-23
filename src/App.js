import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './pages/checkout/co.js'; 
import OrderConfirm from './pages/orderconfirm/oc.js';
import OrderTrack from './pages/ordertracking/ot.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderconfirm" element={<OrderConfirm />} />
        <Route path="/ordertrack" element={<OrderTrack />} />
      </Routes>
    </Router>
  );
}

export default App;
