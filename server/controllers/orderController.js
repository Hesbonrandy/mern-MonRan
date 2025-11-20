import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    const { customerName, customerPhone, items, total } = req.body;

    if (!customerName) return res.status(400).json({ message: 'Name is required' });
    if (!customerPhone) return res.status(400).json({ message: 'Phone is required' });
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    if (typeof total !== 'number' || total <= 0) {
      return res.status(400).json({ message: 'Invalid total' });
    }
    for (const item of items) {
      if (!item.menuItem || !item.name || !item.price || !item.quantity) {
        return res.status(400).json({ message: 'Invalid menu item in cart' });
      }
    }

    const order = new Order(req.body);
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(400).json({ message: 'Failed to create order: ' + error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.menuItem').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};