import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FAQ from './pages/FAQ/Faq.js';
import TermsAndConditions from './pages/TermsAndConditions/TermsAndConditions.js';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy.js';


function App() {
  return (
    <Router>
 
      
      <Routes>
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />

      </Routes>

  
    </Router>
  );
}

export default App;