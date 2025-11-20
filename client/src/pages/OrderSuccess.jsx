import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function OrderSuccess() {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const handleNewOrder = () => {
    clearCart();
    navigate('/menu');
  };

  return (
    <div className="container" style={{ 
      padding: '4rem 1rem', 
      textAlign: 'center',
      backgroundColor: '#F8F5F0'
    }}>
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        backgroundColor: 'white', 
        padding: '3rem', 
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          backgroundColor: '#E6C588', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          margin: '0 auto 1.5rem'
        }}>
          <span style={{ fontSize: '2.5rem' }}>✅</span>
        </div>
        
        <h1 style={{ color: '#6F4E37', marginBottom: '1rem' }}>Order Confirmed!</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          Thank you for your order! Your drinks are being prepared and will be ready in 5–10 minutes.
        </p>
        
        <div style={{ 
          backgroundColor: '#E6C588', 
          padding: '1.5rem', 
          borderRadius: '12px', 
          marginBottom: '2rem',
          textAlign: 'left'
        }}>
          <h3 style={{ color: '#6F4E37', marginBottom: '0.5rem' }}>Next Steps:</h3>
          <ul style={{ paddingLeft: '1.2rem', textAlign: 'left' }}>
            <li>Keep your phone nearby for updates</li>
            <li>Find a seat or wait at the counter</li>
            <li>We'll call your name when ready!</li>
          </ul>
        </div>
        
        <button
          onClick={handleNewOrder}
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#6F4E37',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Order Again
        </button>
      </div>
    </div>
  );
}