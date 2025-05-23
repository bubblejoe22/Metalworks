import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login.js';
import Home from './pages/Home/Home.js';
import Signup from './pages/Signup/Signup.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Search from './components/Header/Search/Search';


function App() {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Header" element={<Header />} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;