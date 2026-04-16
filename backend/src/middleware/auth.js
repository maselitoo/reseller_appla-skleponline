import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware do weryfikacji tokenu JWT
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Pobierz token z nagłówka
      token = req.headers.authorization.split(' ')[1];

      // Weryfikuj token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Pobierz użytkownika z bazy (bez hasła)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Użytkownik nie istnieje' });
      }

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ message: 'Nieprawidłowy token' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Brak tokenu autoryzacji' });
  }
};

// Middleware do sprawdzania roli admina
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Brak uprawnień administratora' });
  }
};

// Opcjonalna autoryzacja (nie wymaga tokenu, ale jeśli jest to go weryfikuje)
export const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (error) {
      // Token nieprawidłowy, ale kontynuuj bez użytkownika
      req.user = null;
    }
  }

  next();
};

// Made with Bob
