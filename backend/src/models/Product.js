import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nazwa produktu jest wymagana'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Opis produktu jest wymagany']
  },
  price: {
    type: Number,
    required: [true, 'Cena jest wymagana'],
    min: 0
  },
  category: {
    type: String,
    required: [true, 'Kategoria jest wymagana'],
    enum: ['iPhone', 'MacBook', 'iPad', 'Watch', 'AirPods', 'Accessories']
  },
  image: {
    type: String,
    required: [true, 'Zdjęcie produktu jest wymagane']
  },
  images: [{
    type: String
  }],
  inStock: {
    type: Boolean,
    default: true
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  brand: {
    type: String,
    default: 'Apple'
  },
  specifications: {
    type: Map,
    of: String
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  }
}, {
  timestamps: true
});

// Indeksy dla lepszej wydajności wyszukiwania
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });

const Product = mongoose.model('Product', productSchema);

export default Product;

// Made with Bob
