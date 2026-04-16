// Middleware do obsługi błędów 404
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Główny middleware do obsługi błędów
export const errorHandler = (err, req, res, next) => {
  // Ustaw status code (jeśli nie został ustawiony, użyj 500)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Odpowiedź z błędem
  res.json({
    message: err.message,
    // Stack trace tylko w development
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

// Middleware do walidacji MongoDB ObjectId
export const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400);
    throw new Error('Nieprawidłowe ID');
  }
  
  next();
};

// Made with Bob
