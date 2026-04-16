import express from 'express';
import {
  createOrder,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderStatus,
  cancelOrder,
  getOrderStats
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';
import { validateObjectId } from '../middleware/errorHandler.js';

const router = express.Router();

// Chronione endpointy
router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, validateObjectId, getOrderById);
router.put('/:id/pay', protect, validateObjectId, updateOrderToPaid);
router.put('/:id/cancel', protect, validateObjectId, cancelOrder);

// Endpointy dla admina
router.get('/', protect, admin, getOrders);
router.get('/stats/summary', protect, admin, getOrderStats);
router.put('/:id/deliver', protect, admin, validateObjectId, updateOrderToDelivered);
router.put('/:id/status', protect, admin, validateObjectId, updateOrderStatus);

export default router;

// Made with Bob
