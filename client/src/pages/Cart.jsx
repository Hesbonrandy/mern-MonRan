import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { api } from '../utils/api';

export default function Cart() {
  const { cart, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const placeOrder = async () => {
    try {
      const orderData = {
        customerName,
        customerPhone,
        notes,
        items: cart.map(item => ({
          menuItem: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total
      };
      await api.post('/api/orders', orderData);
      clearCart();
      navigate('/order-success');
    } catch (err) {
      alert('Failed to place order');
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1>Your Order</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item._id} style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
              <h3>{item.name}</h3>
              <p>{item.quantity} × KSh {item.price} = KSh {item.price * item.quantity}</p>
            </div>
          ))}
          <h2>Total: KSh {total}</h2>
          <div style={{ marginTop: '2rem' }}>
            <input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Your Name" required style={{ display: 'block', width: '100%', padding: '0.7rem', margin: '0.5rem 0' }} />
            <input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} placeholder="Phone Number" required style={{ display: 'block', width: '100%', padding: '0.7rem', margin: '0.5rem 0' }} />
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Special instructions" style={{ display: 'block', width: '100%', padding: '0.7rem', margin: '0.5rem 0' }} />
            <button onClick={placeOrder} style={{ padding: '1rem 2rem', backgroundColor: '#6F4E37', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1.1rem' }}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}