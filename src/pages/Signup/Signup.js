import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import textboxImage from '../../assets/textbox.PNG';


const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form validation errors
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

     const [isBubbleVisible, setIsBubbleVisible] = useState(true); // 🟢 Bubble state
    useDismissBubble(setIsBubbleVisible);

  const validateForm = () => {
    let isValid = true;

    if (!firstName) {
      setFirstNameError('First name is required');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    if (!lastName) {
      setLastNameError('Last name is required');
      isValid = false;
    } else {
      setLastNameError('');
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // PHP integration - This would be replaced with your actual PHP endpoint
      const response = await fetch('api/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }
      
      // Handle successful signup
      console.log('Signup successful', data);
      
      // Redirect to login page
      window.location.href = '/login';
      
    } catch (err) {
      console.error('Signup error:', err);
      setError(err instanceof Error ? err.message : 'Failed to signup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  function useDismissBubble(setVisible) {
    useEffect(() => {
      const handleClick = () => {
        setVisible(false);
      };
  
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, [setVisible]);
  }

  return (
    <div className="signup-container">
        <div className="welcome-message">Be a new adventurer!</div>
      <div className="signup-card" 
      style={{ 
        backgroundImage: `url(${textboxImage})`,
        backgroundSize: 'contain', // or 'cover', or '100% 100%'
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '500px',
        height: '300px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
     }}>
        <h1 className="signup-title">Sign Up</h1>
        
        {error && (
          <div className="error-alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
           <div className="form-rows">
          <div className="name-row">
            <div className="form-group">
              <input 
                type="text"
                className="form-input"
                placeholder='First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {firstNameError && <p className="error-message">{firstNameError}</p>}
            </div>
            
            <div className="form-group">
              <input 
                type="text"
                className="form-input"
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {lastNameError && <p className="error-message">{lastNameError}</p>}
            </div>
          </div>
          
          <div className='credits-row'>
          <div className="form-group">
            <input 
              type="email"
              className="form-input"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          
          <div className="form-group">
            <input 
              type="password"
              className="form-input"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          </div>
          </div>
          <button 
            type="submit" 
            className="submit-button" 
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
          
          <div className="form-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="form-link">
                Login
              </Link>
            </p>
          </div>
      </div>
      <div className="character-container">
        {isBubbleVisible && (
          <div className="character-bubble">
            <p>Sign up with us!</p>
            <p className="bubble-footnote">Click anywhere to exit.</p>
          </div>
        )}
        <div className="pixel-character"></div>
      </div>
    </div>

  );
};

export default Signup;