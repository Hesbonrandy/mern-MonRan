import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

export default function Menu() {
  const { addToCart, getItemQuantity } = useCart();
  const [items, setItems] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menu items and types
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, typesRes] = await Promise.all([
          axios.get('/api/menu'),
          axios.get('/api/types')
        ]);
        setItems(menuRes.data);
        setTypes(typesRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching menu data:', err);
        setError('Failed to load menu. Please try again later.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle item deletion
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;

    try {
      await axios.delete(`/api/menu/${id}`);
      setItems(prevItems => prevItems.filter(item => item._id !== id));
    } catch (err) {
      alert(`Failed to delete "${name}". It might be in use.`);
      console.error('Delete error:', err);
    }
  };

  // Filter items by selected type
  const filteredItems = selectedType
    ? items.filter(item => item.itemType?._id === selectedType)
    : items;

  // Check if user is logged in (admin)
  const isLoggedIn = !!localStorage.getItem('token');

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
        <p>Loading menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
        <p style={{ color: 'red' }}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#6F4E37',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h1 style={{ color: '#6F4E37' }}>☕ Our Menu</h1>

        {isLoggedIn && (
          <Link
            to="/menu/new"
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: '#6F4E37',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '30px',
              fontWeight: '600'
            }}
          >
            ➕ Add New Item
          </Link>
        )}
      </div>

      {/* Filter Tabs */}
      <div style={{
        marginBottom: '2rem',
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}>
        {/* ALL button */}
        <button
          onClick={() => setSelectedType('')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: selectedType === '' ? '#6F4E37' : '#E0E0E0',
            color: selectedType === '' ? 'white' : '#333',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          All ({items.length})
        </button>

        {types.map(type => (
          <button
            key={type._id}
            onClick={() => setSelectedType(type._id)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: selectedType === type._id ? '#6F4E37' : '#E0E0E0',
              color: selectedType === type._id ? 'white' : '#333',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            {type.name} ({items.filter(item => item.itemType?._id === type._id).length})
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      {filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No items found in this category.</p>
          {isLoggedIn && (
            <Link
              to="/menu/new"
              style={{
                marginTop: '1rem',
                display: 'inline-block',
                padding: '0.6rem 1.2rem',
                backgroundColor: '#6F4E37',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '30px'
              }}
            >
              Add Your First Item
            </Link>
          )}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {filteredItems.map(item => (
            <div
              key={item._id}
              className="menu-item"
              style={{
                border: '1px solid #eee',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: 'white',
                transition: 'transform 0.2s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {/* Image */}
              {item.image ? (
                <div style={{
                  width: '100%',
                  height: '180px',
                  overflow: 'hidden',
                  backgroundColor: '#f5f5f5'
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block'
                    }}
                  />
                </div>
              ) : (
                <div style={{
                  width: '100%',
                  height: '180px',
                  backgroundColor: '#F8F5F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6F4E37',
                  fontWeight: 'bold'
                }}>
                  {item.name.substring(0, 2).toUpperCase()}
                </div>
              )}

              {/* Card Content */}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ margin: 0, color: '#6F4E37' }}>{item.name}</h3>

                <p style={{
                  color: '#555',
                  marginBottom: '1rem',
                  minHeight: '60px'
                }}>
                  {item.description}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <strong style={{ fontSize: '1.3rem', color: '#6F4E37' }}>
                    KSh {item.price}
                  </strong>
                  <span style={{
                    backgroundColor: '#E0E0E0',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem'
                  }}>
                    {item.itemType?.name || 'Uncategorized'}
                  </span>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => addToCart(item)}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    backgroundColor: '#6F4E37',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginBottom: '1rem'
                  }}
                >
                  Add to Cart {getItemQuantity(item._id) > 0 && `(${getItemQuantity(item._id)})`}
                </button>

                {/* Admin Controls */}
                {isLoggedIn && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem'
                  }}>
                    <Link
                      to={`/menu/edit/${item._id}`}
                      style={{
                        padding: '0.6rem',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        textAlign: 'center',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontWeight: '600'
                      }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id, item.name)}
                      style={{
                        padding: '0.6rem',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
