import express from 'express';
import { createOrder, getOrders, updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);          // Place order
router.get('/', getOrders);             // Get all orders (admin)
router.patch('/:id/status', updateOrderStatus); // Update status

export default router;