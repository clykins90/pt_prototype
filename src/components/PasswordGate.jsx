import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordGate = ({ children }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication on initial load
    const authStatus = sessionStorage.getItem('isAuthenticated');
    setIsAuthenticated(!!authStatus);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password === process.env.REACT_APP_SITE_PASSWORD) {
      sessionStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      navigate(window.location.pathname);
      window.location.reload(); // Force full refresh to update all components
    } else {
      setError('Incorrect password - please try again');
    }
  };

  if(isAuthenticated) {
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
          onChange={(e) => {
            setPassword(e.target.value);
            setError(''); // Clear error on new input
          }}
          style={{
            width: '100%',
            padding: '0.5rem',
            margin: '1rem 0',
            fontSize: '1rem',
            borderColor: error ? '#ff4444' : '#ddd'
          }}
        />
        {error && <div style={{ color: '#ff4444', marginBottom: '1rem' }}>{error}</div>}
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