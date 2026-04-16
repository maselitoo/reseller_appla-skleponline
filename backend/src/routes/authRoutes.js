import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  getUsers,
  deleteUser
} from '../controllers/authController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Publiczne endpointy
router.post('/register', register);
router.post('/login', login);

// Chronione endpointy
router.route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile);

// Endpointy dla admina
router.route('/users')
  .get(protect, admin, getUsers);

router.route('/users/:id')
  .delete(protect, admin, deleteUser);

export default router;

// Made with Bob
