import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ItemTypeManager() {
  const [types, setTypes] = useState([]);
  const [newType, setNewType] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const res = await axios.get('/api/types');
      setTypes(res.data);
    } catch (err) {
      console.error('Error loading types:', err);
    }
  };

  const handleCreateType = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/types', { name: newType.trim() });
      setNewType('');
      fetchTypes();
    } catch (err) {
      alert('Failed to create type. It may already exist.');
    }
  };

  const handleUpdateType = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/types/${editingId}`, { name: editName });
      setEditingId(null);
      setEditName('');
      fetchTypes();
    } catch (err) {
      alert('Failed to update type.');
    }
  };

  const handleDeleteType = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? Cannot undo if in use.`)) return;
    try {
      await axios.delete(`/api/types/${id}`);
      fetchTypes();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete type.');
    }
  };

  return (
    <div style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h3>Manage Item Types</h3>
      
      {/* Add New */}
      <form onSubmit={handleCreateType} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          placeholder="e.g., Pastries, Cold Brews"
          required
          style={{ flex: 1, padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '0.6rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
          Add Type
        </button>
      </form>

      {/* List */}
      <div>
        <h4>Existing Types ({types.length})</h4>
        {types.length === 0 ? (
          <p>No types yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {types.map(type => (
              <li key={type._id} style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                {editingId === type._id ? (
                  <form onSubmit={handleUpdateType} style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                      style={{ flex: 1, padding: '0.4rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <button type="submit" style={{ padding: '0.4rem 0.8rem', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px' }}>
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      style={{ padding: '0.4rem 0.8rem', backgroundColor: '#9E9E9E', color: 'white', border: 'none', borderRadius: '4px', marginLeft: '0.5rem' }}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <span style={{ flex: 1 }}>{type.name}</span>
                    <button
                      onClick={() => {
                        setEditingId(type._id);
                        setEditName(type.name);
                      }}
                      style={{ padding: '0.3rem 0.6rem', marginRight: '0.5rem', backgroundColor: '#FF9800', color: 'white', border: 'none', borderRadius: '4px' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteType(type._id, type.name)}
                      style={{ padding: '0.3rem 0.6rem', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}