// client/src/components/OrderNotification.jsx
import { useEffect, useRef } from 'react';

export default function OrderNotification({ hasNewOrder, onAcknowledge }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (hasNewOrder && audioRef.current) {
      // Play sound
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      
      // Optional: Show browser notification (if permitted)
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("New Order! ☕", {
          body: "A customer just placed an order!",
          icon: "/images/monran-logo.png"
        });
      }
    }
  }, [hasNewOrder]);

  if (!hasNewOrder) return null;

  return (
    <>
      <audio ref={audioRef} src="/sounds/order-notification.mp3" />
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: '#6F4E37',
        color: 'white',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <strong>🔔 New Order!</strong>
        <button 
          onClick={onAcknowledge}
          style={{
            backgroundColor: '#E6C588',
            color: '#6F4E37',
            border: 'none',
            padding: '0.3rem 0.6rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          View Orders
        </button>
      </div>
    </>
  );
}