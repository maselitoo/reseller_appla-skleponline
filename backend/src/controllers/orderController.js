import Order from '../models/Order.js';
import Product from '../models/Product.js';

// @desc    Utwórz nowe zamówienie
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'Brak produktów w zamówieniu' });
    }

    // Weryfikuj dostępność produktów
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Produkt ${item.name} nie istnieje` });
      }
      if (product.countInStock < item.quantity) {
        return res.status(400).json({ 
          message: `Niewystarczająca ilość produktu ${product.name}. Dostępne: ${product.countInStock}` 
        });
      }
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    });

    const createdOrder = await order.save();

    // Zmniejsz stan magazynowy
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      product.countInStock -= item.quantity;
      product.inStock = product.countInStock > 0;
      await product.save();
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Pobierz zamówienie po ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
      // Sprawdź czy użytkownik ma dostęp do zamówienia
      if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Brak dostępu do tego zamówienia' });
      }
      res.json(order);
    } else {
      res.status(404).json({ message: 'Zamówienie nie znalezione' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Pobierz zamówienia zalogowanego użytkownika
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Pobierz wszystkie zamówienia (admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const pageSize = 20;
    const page = Number(req.query.page) || 1;

    const status = req.query.status ? { status: req.query.status } : {};

    const count = await Order.countDocuments({ ...status });
    const orders = await Order.find({ ...status })
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      orders,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Zaktualizuj zamówienie jako opłacone
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.status = 'processing';
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Zamówienie nie znalezione' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Zaktualizuj zamówienie jako dostarczone (admin)
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      order.status = 'delivered';
      
      if (req.body.trackingNumber) {
        order.trackingNumber = req.body.trackingNumber;
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Zamówienie nie znalezione' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Zaktualizuj status zamówienia (admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status;
      
      if (req.body.trackingNumber) {
        order.trackingNumber = req.body.trackingNumber;
      }
      
      if (req.body.notes) {
        order.notes = req.body.notes;
      }

      if (req.body.status === 'shipped' && !order.isDelivered) {
        order.status = 'shipped';
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Zamówienie nie znalezione' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Anuluj zamówienie
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      // Sprawdź uprawnienia
      if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Brak dostępu do tego zamówienia' });
      }

      // Nie można anulować zamówienia które jest już dostarczone
      if (order.isDelivered) {
        return res.status(400).json({ message: 'Nie można anulować dostarczonego zamówienia' });
      }

      order.status = 'cancelled';

      // Przywróć stan magazynowy
      for (const item of order.orderItems) {
        const product = await Product.findById(item.product);
        if (product) {
          product.countInStock += item.quantity;
          product.inStock = true;
          await product.save();
        }
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Zamówienie nie znalezione' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Pobierz statystyki zamówień (admin)
// @route   GET /api/orders/stats
// @access  Private/Admin
export const getOrderStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const processingOrders = await Order.countDocuments({ status: 'processing' });
    const shippedOrders = await Order.countDocuments({ status: 'shipped' });
    const deliveredOrders = await Order.countDocuments({ status: 'delivered' });
    const cancelledOrders = await Order.countDocuments({ status: 'cancelled' });

    const totalRevenue = await Order.aggregate([
      { $match: { isPaid: true, status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    res.json({
      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Made with Bob
