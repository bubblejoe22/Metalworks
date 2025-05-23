<<<<<<< HEAD
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
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FAQ from './pages/FAQ/Faq.js';
import TermsAndConditions from './pages/TermsAndConditions/TermsAndConditions.js';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy.js';
>>>>>>> origin/deborah


function App() {
  return (
    <Router>
<<<<<<< HEAD
      <div className="App">
        <Header />
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<Search />} />
            <Route path="/list" element={<List />} />

            <Route path="/ShoppingCart" element={<ShoppingCart />} />
            <Route path="/Dashboard" element={<Dashboard />} />

          </Routes>
        </div>

        <Footer />
      </div>
=======
 
      
      <Routes>
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />

      </Routes>

  
>>>>>>> origin/deborah
    </Router>
  );
}

export default App;