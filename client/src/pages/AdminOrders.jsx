import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OrderNotification from '../components/OrderNotification';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [lastOrderTime, setLastOrderTime] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders');
        const sortedOrders = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
        
        // Check for new orders
        if (sortedOrders.length > 0) {
          const newestOrderTime = new Date(sortedOrders[0].createdAt).getTime();
          if (!lastOrderTime || newestOrderTime > lastOrderTime) {
            setLastOrderTime(newestOrderTime);
            if (lastOrderTime) {
              setShowNotification(true); // Only notify if not first load
            }
          }
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, [lastOrderTime]);

  const handleAcknowledge = () => {
    setShowNotification(false);
    navigate('/orders');
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`/api/orders/${id}/status`, { status });
      setOrders(orders.map(order => 
        order._id === id ? { ...order, status } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // ... rest of your render method

  return (
    <>
      <OrderNotification 
        hasNewOrder={showNotification} 
        onAcknowledge={handleAcknowledge} 
      />
      {/* Your existing orders list */}
    </>
  );
}