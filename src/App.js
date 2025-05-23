import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import List from './pages/List/List';
import Search from './Components/Header/Search/Search';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

import ShoppingCart from './pages/ShoppingCart/ShoppingCart.js';
import Dashboard from './pages/Dashboard/Dashboard.js';

import FAQ from './pages/FAQ/Faq.js';
import TermsAndConditions from './pages/TermsAndConditions/TermsAndConditions.js';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy.js';

import Checkout from './pages/checkout/co.js'; 
import OrderConfirm from './pages/orderconfirm/oc.js';
import OrderTrack from './pages/ordertracking/ot.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <div className="main-content">
          <Routes>
            <Route path="/" />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<Search />} />
            <Route path="/list" element={<List />} />

            <Route path="/ShoppingCart" element={<ShoppingCart />} />
            <Route path="/Dashboard" element={<Dashboard />} />

            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />

            <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderconfirm" element={<OrderConfirm />} />
        <Route path="/ordertrack" element={<OrderTrack />} />


          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;