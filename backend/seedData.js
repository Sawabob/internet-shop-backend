require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: 'Ноутбук ASUS VivoBook',
    description: 'Потужний ноутбук для роботи та навчання. Intel Core i5, 8GB RAM, 256GB SSD',
    price: 18999,
    category: 'Електроніка',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop'
  },
  {
    name: 'Смартфон Samsung Galaxy A54',
    description: 'Сучасний смартфон з чудовою камерою. 6.4" AMOLED, 128GB',
    price: 12499,
    category: 'Електроніка',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop'
  },
  {
    name: 'Навушники Sony WH-1000XM5',
    description: 'Бездротові навушники з активним шумозаглушенням',
    price: 8999,
    category: 'Аксесуари',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
  },
  {
    name: 'Клавіатура Logitech MX Keys',
    description: 'Механічна клавіатура для професіоналів',
    price: 3499,
    category: 'Аксесуари',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop'
  },
  {
    name: 'Миша Logitech MX Master 3',
    description: 'Ергономічна бездротова миша для продуктивної роботи',
    price: 2799,
    category: 'Аксесуари',
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop'
  },
  {
    name: 'Монітор Dell UltraSharp 27"',
    description: '4K монітор для професійної роботи. IPS панель, 99% sRGB',
    price: 15999,
    category: 'Електроніка',
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop'
  },
  {
    name: 'Веб-камера Logitech C920',
    description: 'Full HD веб-камера для відеоконференцій',
    price: 2199,
    category: 'Аксесуари',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop'
  },
  {
    name: 'Зовнішній SSD Samsung T7 1TB',
    description: 'Швидкий портативний SSD накопичувач',
    price: 3999,
    category: 'Електроніка',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop'
  },
  {
    name: 'Powerbank Xiaomi 20000mAh',
    description: 'Потужний зовнішній акумулятор з швидкою зарядкою',
    price: 899,
    category: 'Аксесуари',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop'
  },
  {
    name: 'Рюкзак для ноутбука',
    description: 'Зручний рюкзак для ноутбука до 15.6". Водонепроникний матеріал',
    price: 1299,
    category: 'Аксесуари',
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
  }
];

const seedDatabase = async () => {
  try {
    // Підключення до MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Підключено до MongoDB');

    // Видалити всі існуючі продукти
    await Product.deleteMany({});
    console.log('Видалено старі продукти');

    // Додати нові продукти
    await Product.insertMany(sampleProducts);
    console.log(`Додано ${sampleProducts.length} тестових продуктів`);

    console.log('\nТестові дані успішно додані!');
    process.exit(0);
  } catch (error) {
    console.error('Помилка:', error);
    process.exit(1);
  }
};

seedDatabase();
