import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function MenuItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/menu/${id}`)
      .then(res => {
        setItem(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <Link to="/menu" style={{ display: 'inline-block', marginBottom: '1rem', color: '#6F4E37' }}>
        ← Back to Menu
      </Link>
      <div style={{ textAlign: 'center' }}>
        {item.image && <img src={item.image} alt={item.name} style={{ width: '200px', borderRadius: '8px', marginBottom: '1rem' }} />}
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <p><strong>KSh {item.price}</strong></p>
        <p>Category: {item.itemType?.name || 'Unknown'}</p>
        {item.isFeatured && <p style={{ color: '#E6C588', fontWeight: 'bold' }}>🌟 Featured Item</p>}
      </div>
    </div>
  );
}