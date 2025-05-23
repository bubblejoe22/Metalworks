import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage/ProductPages.js';
import ProductDetails from './pages/ProductDetail/ProductDetails.js';
import { CartProvider } from './data/CartProvider.js'

function App() {
  return (
    <CartProvider> {/* Wrap entire app with CartProvider */}
      <Router>
        <Routes>
          <Route path="/product" element={<ProductPage />} />
          <Route path="/productdetails/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;