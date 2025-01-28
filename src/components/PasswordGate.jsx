import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordGate = ({ children }) => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(password === process.env.REACT_APP_SITE_PASSWORD) {
      sessionStorage.setItem('isAuthenticated', 'true');
      navigate(window.location.pathname); // Refresh current path
    }
  };

  if(sessionStorage.getItem('isAuthenticated')) {
    return children;
  }

  return (
    <div style={{ 
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '2rem',
      border: '1px solid #ddd',
      borderRadius: '8px'
    }}>
      <h2>Enter Site Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            margin: '1rem 0',
            fontSize: '1rem'
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Enter Site
        </button>
      </form>
    </div>
  );
};

export default PasswordGate; 