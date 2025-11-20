import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || 'Authentication failed. Please try again.';
      alert(message);
      console.error('Auth error:', err);
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '2rem auto', 
      padding: '2rem',
      border: '1px solid #ddd',
      borderRadius: '8px'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        {isLogin ? 'Login' : 'Register'}
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button 
          type="submit" 
          style={{ 
            padding: '0.75rem', 
            backgroundColor: '#6F4E37', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
        <button 
          type="button" 
          onClick={() => setIsLogin(!isLogin)}
          style={{ 
            padding: '0.75rem', 
            backgroundColor: '#E6C588', 
            color: '#6F4E37', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isLogin ? 'Need an account?' : 'Already have one?'}
        </button>
      </form>
    </div>
  );
}