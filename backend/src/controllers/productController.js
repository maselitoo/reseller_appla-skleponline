import Product from '../models/Product.js';

// @desc    Pobierz wszystkie produkty z filtrowaniem i sortowaniem
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.page) || 1;

    // Filtrowanie
    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword, $options: 'i' } },
            { description: { $regex: req.query.keyword, $options: 'i' } }
          ]
        }
      : {};

    const category = req.query.category && req.query.category !== 'All'
      ? { category: req.query.category }
      : {};

    const inStock = req.query.inStock === 'true'
      ? { inStock: true }
      : {};

    // Sortowanie
    let sortOption = {};
    switch (req.query.sortBy) {
      case 'price-asc':
        sortOption = { price: 1 };
        break;
      case 'price-desc':
        sortOption = { price: -1 };
        break;
      case 'rating':
        sortOption = { rating: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { name: 1 };
    }

    const count = await Product.countDocuments({ ...keyword, ...category, ...inStock });
    const products = await Product.find({ ...keyword, ...category, ...inStock })
      .sort(sortOption)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Pobierz pojedynczy produkt
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Produkt nie znaleziony' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Utwórz nowy produkt (admin)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.body.image,
      images: req.body.images || [],
      countInStock: req.body.countInStock,
      specifications: req.body.specifications || {},
      featured: req.body.featured || false,
      discount: req.body.discount || 0
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Aktualizuj produkt (admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.category = req.body.category || product.category;
      product.image = req.body.image || product.image;
      product.images = req.body.images || product.images;
      product.countInStock = req.body.countInStock ?? product.countInStock;
      product.inStock = req.body.countInStock > 0;
      product.specifications = req.body.specifications || product.specifications;
      product.featured = req.body.featured ?? product.featured;
      product.discount = req.body.discount ?? product.discount;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Produkt nie znaleziony' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Usuń produkt (admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Produkt usunięty' });
    } else {
      res.status(404).json({ message: 'Produkt nie znaleziony' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Dodaj recenzję produktu
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      // Sprawdź czy użytkownik już dodał recenzję
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: 'Już dodałeś recenzję tego produktu' });
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Recenzja dodana' });
    } else {
      res.status(404).json({ message: 'Produkt nie znaleziony' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Pobierz wyróżnione produkty
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Pobierz kategorie
// @route   GET /api/products/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Made with Bob
