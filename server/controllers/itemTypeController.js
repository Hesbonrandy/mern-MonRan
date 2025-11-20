import ItemType from '../models/ItemType.js';

// @desc    Get all item types
// @route   GET /api/types
export const getItemTypes = async (req, res) => {
  try {
    const types = await ItemType.find().sort({ name: 1 });
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get item type by ID
// @route   GET /api/types/:id
export const getItemTypeById = async (req, res) => {
  try {
    const type = await ItemType.findById(req.params.id);
    if (!type) return res.status(404).json({ message: 'Item type not found' });
    res.json(type);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new item type
// @route   POST /api/types
export const createItemType = async (req, res) => {
  try {
    const itemType = new ItemType(req.body);
    const saved = await itemType.save();
    res.status(201).json(saved);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Item type already exists' });
    }
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update item type
// @route   PUT /api/types/:id
export const updateItemType = async (req, res) => {
  try {
    const itemType = await ItemType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!itemType) return res.status(404).json({ message: 'Item type not found' });
    res.json(itemType);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Item type already exists' });
    }
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete item type
// @route   DELETE /api/types/:id
export const deleteItemType = async (req, res) => {
  try {
    // 🔒 Prevent deletion if in use by menu items
    const menuItemCount = await MenuItem.countDocuments({ itemType: req.params.id });
    if (menuItemCount > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete: this type is used by menu items' 
      });
    }

    const itemType = await ItemType.findByIdAndDelete(req.params.id);
    if (!itemType) return res.status(404).json({ message: 'Item type not found' });
    res.json({ message: 'Item type deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};