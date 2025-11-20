import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// ✅ ItemType Manager Component (Embedded)
function ItemTypeManager({ onTypeChange }) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const res = await axios.get('/api/types');
      setTypes(res.data);
      if (onTypeChange) onTypeChange(res.data);
    } catch (err) {
      console.error('Error loading types:', err);
    }
  };

  const handleCreateType = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get('newType').trim();
    if (!name) return;

    try {
      await axios.post('/api/types', { name });
      fetchTypes(); // Refresh list
    } catch (err) {
      alert('Failed to create type. It may already exist.');
    }
  };

  const handleUpdateType = async (id, name) => {
    try {
      await axios.put(`/api/types/${id}`, { name });
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
          name="newType"
          type="text"
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
                <span style={{ flex: 1 }}>{type.name}</span>
                <button
                  onClick={() => {
                    const newName = prompt('Edit type name:', type.name);
                    if (newName && newName !== type.name) {
                      handleUpdateType(type._id, newName.trim());
                    }
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ✅ Main CreateMenuItem Component
export default function CreateMenuItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [itemType, setItemType] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [image, setImage] = useState('');
  const [typesForDropdown, setTypesForDropdown] = useState([]); // ✅ Added
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ Fetch types for dropdown
  useEffect(() => {
    const fetchTypesForDropdown = async () => {
      try {
        const res = await axios.get('/api/types');
        setTypesForDropdown(res.data);
      } catch (err) {
        console.error('Error loading types for dropdown:', err);
      }
    };
    fetchTypesForDropdown();
  }, []);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      axios.get(`/api/menu/${id}`)
        .then(res => {
          const item = res.data;
          setName(item.name);
          setDescription(item.description);
          setPrice(item.price);
          setItemType(item.itemType._id);
          setIsFeatured(item.isFeatured);
          setImage(item.image);
        })
        .catch(err => {
          console.error('Error loading item:', err);
          alert('Failed to load menu item');
          navigate('/menu');
        });
    }
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const menuItemData = { 
      name, 
      description, 
      price: Number(price), 
      itemType, 
      isFeatured, 
      image 
    };

    try {
      if (isEditing) {
        await axios.put(`/api/menu/${id}`, menuItemData);
      } else {
        await axios.post('/api/menu', menuItemData);
      }
      navigate('/menu');
    } catch (err) {
      alert('Failed to save menu item. Please check all fields.');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>{isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}</h1>
      
      {/* ✅ FULL ITEM TYPE MANAGER */}
      <ItemTypeManager onTypeChange={setTypesForDropdown} />

      {/* Menu Item Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div>
          <label><strong>Name</strong></label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '0.7rem', marginTop: '0.3rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label><strong>Description</strong></label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            style={{ width: '100%', padding: '0.7rem', marginTop: '0.3rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label><strong>Price (KSh)</strong></label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            style={{ width: '100%', padding: '0.7rem', marginTop: '0.3rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* ✅ PERFECTLY SYNCED DROPDOWN */}
        <div>
          <label><strong>Item Type</strong></label>
          <select
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            required
            style={{ width: '100%', padding: '0.7rem', marginTop: '0.3rem', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">-- Select Type --</option>
            {typesForDropdown.map(type => (
              <option key={type._id} value={type._id}>{type.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label><strong>Image URL</strong> (optional)</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            style={{ width: '100%', padding: '0.7rem', marginTop: '0.3rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
            <span style={{ marginLeft: '0.5rem' }}>Featured Item</span>
          </label>
        </div>

        <div>
          <button type="submit" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem', backgroundColor: '#6F4E37', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            {isEditing ? 'Update Item' : 'Add to Menu'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/menu')}
            style={{ marginLeft: '1rem', padding: '0.8rem 2rem', fontSize: '1.1rem', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}