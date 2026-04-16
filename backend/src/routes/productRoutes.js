import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getFeaturedProducts,
  getCategories
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/auth.js';
import { validateObjectId } from '../middleware/errorHandler.js';

const router = express.Router();

// Publiczne endpointy
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/categories', getCategories);
router.get('/:id', validateObjectId, getProductById);

// Chronione endpointy
router.post('/:id/reviews', protect, validateObjectId, createProductReview);

// Endpointy dla admina
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, validateObjectId, updateProduct);
router.delete('/:id', protect, admin, validateObjectId, deleteProduct);

export default router;

// Made with Bob
