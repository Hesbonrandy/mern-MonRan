import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminTools() {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups =  () => {
    try {
      const res =  axios.get('/api/admin/backups');
      setBackups(res.data);
    } catch (err) {
      console.error('Failed to load backups:', err);
    }
  };

  const handleHardReset = async () => {
    if (!window.confirm('⚠️ HARD RESET: This will DELETE all current menu items and restore the default MonRan menu. Create a backup first?')) {
      return;
    }
    
    setLoading(true);
    try {
      await axios.post('/api/admin/reset/hard');
      alert('✅ Hard reset completed! Menu restored to default.');
      navigate('/menu');
    } catch (err) {
      alert('❌ Hard reset failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSoftReset = async () => {
    setLoading(true);
    try {
      await axios.post('/api/admin/reset/soft');
      alert('✅ Soft reset completed! Only changed items were updated.');
      navigate('/menu');
    } catch (err) {
      alert('❌ Soft reset failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (filename) => {
    if (!window.confirm(`Restore from ${filename}? This will replace your current menu.`)) {
      return;
    }
    
    setLoading(true);
    try {
      await axios.post(`/api/admin/backups/restore/${filename}`);
      alert(`✅ Restored from ${filename}!`);
      navigate('/menu');
    } catch (err) {
      alert('❌ Restore failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ color: '#6F4E37' }}>🛠️ Admin Tools</h1>
      
      {/* Reset Buttons */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '1.5rem', 
        marginBottom: '3rem',
        marginTop: '2rem'
      }}>
        <div style={{ 
          border: '2px solid #f44336', 
          borderRadius: '12px', 
          padding: '1.5rem',
          backgroundColor: '#fff5f5'
        }}>
          <h3 style={{ color: '#f44336', marginBottom: '1rem' }}>🔥 Hard Reset</h3>
          <p style={{ marginBottom: '1rem' }}>
            <strong>Deletes everything</strong> and restores the default MonRan menu.
          </p>
          <button
            onClick={handleHardReset}
            disabled={loading}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              padding: '0.6rem 1.2rem',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Processing...' : 'Hard Reset'}
          </button>
        </div>

        <div style={{ 
          border: '2px solid #4CAF50', 
          borderRadius: '12px', 
          padding: '1.5rem',
          backgroundColor: '#f5fff5'
        }}>
          <h3 style={{ color: '#4CAF50', marginBottom: '1rem' }}>🔄 Soft Reset</h3>
          <p style={{ marginBottom: '1rem' }}>
            <strong>Updates only changed items</strong> — keeps your custom additions.
          </p>
          <button
            onClick={handleSoftReset}
            disabled={loading}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '0.6rem 1.2rem',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Processing...' : 'Soft Reset'}
          </button>
        </div>
      </div>

      {/* Backups */}
      <div>
        <h2 style={{ color: '#6F4E37', marginBottom: '1rem' }}>💾 Backups</h2>
        {backups.length === 0 ? (
          <p>No backups found. Hard reset will create a backup automatically.</p>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {backups.map(backup => (
              <div key={backup.name} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '1rem',
                border: '1px solid #eee',
                borderRadius: '8px'
              }}>
                <div>
                  <strong>{backup.name}</strong>
                  <br />
                  <small>{new Date(backup.date).toLocaleString()}</small>
                </div>
                <button
                  onClick={() => handleRestore(backup.name)}
                  style={{
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#fff8e1', borderRadius: '8px' }}>
        <h3>💡 Pro Tips</h3>
        <ul>
          <li><strong>Hard Reset</strong>: Use when you want to start completely fresh</li>
          <li><strong>Soft Reset</strong>: Use when you've updated menu descriptions/prices in code</li>
          <li><strong>Backups</strong>: Automatically created during hard reset</li>
        </ul>
      </div>
    </div>
  );
}