const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Product = require('../models/Product');
const User = require('../models/User');

let authToken;
let testProductId;

describe('Products API Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST || process.env.MONGODB_URI);

    // Створення тестового користувача та отримання токена
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Product Tester',
        email: 'test.products@example.com',
        password: 'password123'
      });

    authToken = response.body.token;
  });

  afterAll(async () => {
    await Product.deleteMany({ name: /Тестовий/ });
    await User.deleteMany({ email: 'test.products@example.com' });
    await mongoose.connection.close();
  });

  describe('GET /api/products', () => {
    it('повинен повернути список всіх продуктів', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /api/products', () => {
    it('повинен створити новий продукт з валідним токеном', async () => {
      const productData = {
        name: 'Тестовий Ноутбук',
        description: 'Опис тестового ноутбука',
        price: 25000,
        category: 'Електроніка',
        stock: 10,
        imageUrl: 'https://example.com/image.jpg'
      };

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${authToken}`)
        .send(productData)
        .expect(201);

      expect(response.body).toHaveProperty('product');
      expect(response.body.product.name).toBe(productData.name);
      expect(response.body.product.price).toBe(productData.price);

      testProductId = response.body.product._id;
    });

    it('повинен повернути помилку без токена авторизації', async () => {
      const productData = {
        name: 'Тестовий Продукт',
        description: 'Опис',
        price: 1000,
        category: 'Тест',
        stock: 5
      };

      const response = await request(app)
        .post('/api/products')
        .send(productData)
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /api/products/:id', () => {
    it('повинен повернути продукт за ID', async () => {
      const response = await request(app)
        .get(`/api/products/${testProductId}`)
        .expect(200);

      expect(response.body).toHaveProperty('_id', testProductId);
      expect(response.body).toHaveProperty('name');
    });

    it('повинен повернути 404 для неіснуючого продукту', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/products/${fakeId}`)
        .expect(404);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('PUT /api/products/:id', () => {
    it('повинен оновити продукт з валідним токеном', async () => {
      const updateData = {
        price: 30000,
        stock: 15
      };

      const response = await request(app)
        .put(`/api/products/${testProductId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.product.price).toBe(updateData.price);
      expect(response.body.product.stock).toBe(updateData.stock);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('повинен видалити продукт з валідним токеном', async () => {
      const response = await request(app)
        .delete(`/api/products/${testProductId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('message');
    });
  });
});
