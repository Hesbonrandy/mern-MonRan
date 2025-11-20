import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Link } from 'react-router-dom';
import { useCart } from './context/CartContext';

export default function App() {
  const { user, logout, loading } = useAuth();
  const { getTotalItems } = useCart();

   useEffect(() => {
    // Request notification permission on first visit
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // ✅ Early return AFTER all hooks
  if (loading) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center', 
        fontSize: '1.2rem',
        color: '#6F4E37'
      }}>
        Brewing your MonRan experience...
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      backgroundColor: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header/Navigation */}
      <header style={{ 
        backgroundColor: '#6F4E37', 
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        minHeight: '70px'
      }}>
        {/* Logo */}
        <Link to="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          textDecoration: 'none',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.4rem'
        }}>
          <img 
            src="/images/MonRan-Coffee-House.png" 
            alt="image of MonRan Coffee House" 
            style={{ height: 'auto', maxHeight: '70px', width: 'auto', maxWidth: '100%' }} 
          />
        </Link>
        
        {/* Navigation Links */}
        <nav>
          <div style={{ 
            display: 'flex', 
            gap: '1.5rem', 
            alignItems: 'center', 
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <Link to="/menu" style={{ color: 'white', textDecoration: 'none' }}>Menu</Link>
            <Link to="/events" style={{ color: 'white', textDecoration: 'none' }}>Events</Link>
            <Link to="/visit" style={{ color: 'white', textDecoration: 'none' }}>Visit Us</Link>
            
            {/* Cart Icon */}
            <Link to="/cart" style={{ 
              color: 'white', 
              textDecoration: 'none', 
              position: 'relative'
            }}>
              🛒
              {getTotalItems() > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#E6C588',
                  color: '#6F4E37',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 'bold'
                }}>
                  {getTotalItems()}
                </span>
              )}
            </Link>
            
            {/* Auth */}
            {user ? (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <span style={{ color: 'white' }}>{user.email}</span>
                <button 
                  onClick={logout}
                  style={{ 
                    backgroundColor: '#E6C588', 
                    color: '#6F4E37', 
                    border: 'none', 
                    padding: '0.3rem 0.8rem', 
                    borderRadius: '20px',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#F8F5F0', 
        textAlign: 'center', 
        padding: '2rem 1rem',
        color: '#6F4E37',
        marginTop: 'auto'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <Link to="/menu" style={{ margin: '0 1rem', color: '#6F4E37', textDecoration: 'none' }}>Menu</Link>
          <Link to="/events" style={{ margin: '0 1rem', color: '#6F4E37', textDecoration: 'none' }}>Events</Link>
          <Link to="/visit" style={{ margin: '0 1rem', color: '#6F4E37', textDecoration: 'none' }}>Visit Us</Link>
          {user && <Link to="/admin/tools" style={{ margin: '0 1rem', color: '#6F4E37', textDecoration: 'none' }}>Admin Tools</Link>}
        </div>
        <p>© {new Date().getFullYear()} MonRan Coffee House. Brewing community in Kinoo.</p>
      </footer>
    </div>
  );
}