import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generuj JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// @desc    Rejestracja użytkownika
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Sprawdź czy użytkownik już istnieje
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Użytkownik z tym emailem już istnieje' });
    }

    // Utwórz użytkownika
    const user = await User.create({
      name,
      email,
      password
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Nieprawidłowe dane użytkownika' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Logowanie użytkownika
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Znajdź użytkownika (z hasłem)
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Nieprawidłowy email lub hasło' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Pobierz profil użytkownika
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        avatar: user.avatar,
        createdAt: user.createdAt
      });
    } else {
      res.status(404).json({ message: 'Użytkownik nie znaleziony' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Aktualizuj profil użytkownika
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      
      if (req.body.address) {
        user.address = {
          ...user.address,
          ...req.body.address
        };
      }

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        address: updatedUser.address,
        token: generateToken(updatedUser._id)
      });
    } else {
      res.status(404).json({ message: 'Użytkownik nie znaleziony' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Pobierz wszystkich użytkowników (admin)
// @route   GET /api/auth/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Usuń użytkownika (admin)
// @route   DELETE /api/auth/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.deleteOne();
      res.json({ message: 'Użytkownik usunięty' });
    } else {
      res.status(404).json({ message: 'Użytkownik nie znaleziony' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Made with Bob
