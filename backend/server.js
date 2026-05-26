require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Підключення до бази даних
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Базовий маршрут
app.get('/', (req, res) => {
  res.json({ message: 'API інтернет-магазину працює' });
});

// Обробка помилок 404
app.use((req, res) => {
  res.status(404).json({ message: 'Маршрут не знайдено' });
});

const PORT = process.env.PORT || 5000;

// Запуск сервера тільки якщо не в тестовому режимі
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
  });
}

// Експорт для тестування
module.exports = app;
