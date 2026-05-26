const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

let authToken;
let testProductId;

describe('Cart API Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST || process.env.MONGODB_URI);

    // Створення тестового користувача
    const userResponse = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Cart Tester',
        email: 'test.cart@example.com',
        password: 'password123'
      });

    authToken = userResponse.body.token;

    // Створення тестового продукту
    const productResponse = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Тестовий Товар для Кошика',
        description: 'Опис товару',
        price: 5000,
        category: 'Тест',
        stock: 20
      });

    testProductId = productResponse.body.product._id;
  });

  afterAll(async () => {
    await Cart.deleteMany({});
    await Product.deleteMany({ name: /Тестовий Товар/ });
    await User.deleteMany({ email: 'test.cart@example.com' });
    await mongoose.connection.close();
  });

  describe('POST /api/cart/add', () => {
    it('повинен додати товар до кошика', async () => {
      const response = await request(app)
        .post('/api/cart/add')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          productId: testProductId,
          quantity: 2
        })
        .expect(200);

      expect(response.body).toHaveProperty('cart');
      expect(response.body.cart.items).toHaveLength(1);
      expect(response.body.cart.items[0].quantity).toBe(2);
    });

    it('повинен збільшити кількість при повторному додаванні', async () => {
      const response = await request(app)
        .post('/api/cart/add')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          productId: testProductId,
          quantity: 3
        })
        .expect(200);

      expect(response.body.cart.items[0].quantity).toBe(5); // 2 + 3
    });

    it('повинен повернути помилку без токена', async () => {
      const response = await request(app)
        .post('/api/cart/add')
        .send({
          productId: testProductId,
          quantity: 1
        })
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });

    it('повинен повернути помилку при недостатній кількості на складі', async () => {
      const response = await request(app)
        .post('/api/cart/add')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          productId: testProductId,
          quantity: 100
        })
        .expect(400);

      expect(response.body.message).toContain('складі');
    });
  });

  describe('GET /api/cart', () => {
    it('повинен повернути кошик користувача', async () => {
      const response = await request(app)
        .get('/api/cart')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('items');
      expect(response.body.items.length).toBeGreaterThan(0);
    });
  });

  describe('PUT /api/cart/update', () => {
    it('повинен оновити кількість товару в кошику', async () => {
      const response = await request(app)
        .put('/api/cart/update')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          productId: testProductId,
          quantity: 3
        })
        .expect(200);

      expect(response.body.cart.items[0].quantity).toBe(3);
    });
  });

  describe('DELETE /api/cart/remove/:productId', () => {
    it('повинен видалити товар з кошика', async () => {
      const response = await request(app)
        .delete(`/api/cart/remove/${testProductId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.cart.items).toHaveLength(0);
    });
  });

  describe('DELETE /api/cart/clear', () => {
    beforeEach(async () => {
      // Додаємо товар перед очищенням
      await request(app)
        .post('/api/cart/add')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          productId: testProductId,
          quantity: 1
        });
    });

    it('повинен очистити весь кошик', async () => {
      const response = await request(app)
        .delete('/api/cart/clear')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.cart.items).toHaveLength(0);
    });
  });
});
