const { createContainer, asClass, asFunction, asValue } = require('awilix');
const connectDB = require('./config/db');

// Controllers
const authController = require('./controllers/authController');
const productController = require('./controllers/productController');
const cartController = require('./controllers/cartController');

// Services
const AuthService = require('./services/AuthService');
const ProductService = require('./services/ProductService');
const CartService = require('./services/CartService');

// Models
const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');

// Middleware
const authMiddleware = require('./middleware/auth');

const container = createContainer();

container.register({
  // Models
  userModel: asValue(User),
  productModel: asValue(Product),
  cartModel: asValue(Cart),

  // Services
  authService: asClass(AuthService).singleton(),
  productService: asClass(ProductService).singleton(),
  cartService: asClass(CartService).singleton(),

  // Controllers
  authController: asFunction(authController).singleton(),
  productController: asFunction(productController).singleton(),
  cartController: asFunction(cartController).singleton(),

  // Middleware
  authMiddleware: asValue(authMiddleware),

  // Database connection
  connectDB: asValue(connectDB)
});

module.exports = container;
