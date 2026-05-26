const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Product = require('../models/Product');

describe('Auth API Tests', () => {
  beforeAll(async () => {
    // Підключення до тестової бази даних
    await mongoose.connect(process.env.MONGODB_URI_TEST || process.env.MONGODB_URI);
  });

  afterAll(async () => {
    // Очищення тестових даних та закриття з'єднання
    await User.deleteMany({ email: /test.*@example\.com/ });
    await mongoose.connection.close();
  });

  describe('POST /api/auth/register', () => {
    it('повинен успішно зареєструвати нового користувача', async () => {
      const userData = {
        name: 'Тестовий Користувач',
        email: 'test.register@example.com',
        password: '123456'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.name).toBe(userData.name);
    });

    it('повинен повернути помилку при реєстрації з існуючим email', async () => {
      const userData = {
        name: 'Дублікат',
        email: 'test.register@example.com',
        password: '123456'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('вже існує');
    });

    it('повинен повернути помилку при відсутності обов\'язкових полів', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Тест' })
        .expect(500);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeAll(async () => {
      // Створення тестового користувача для логіну
      await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Логін Тест',
          email: 'test.login@example.com',
          password: 'password123'
        });
    });

    it('повинен успішно авторизувати користувача з правильними даними', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test.login@example.com',
          password: 'password123'
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('test.login@example.com');
    });

    it('повинен повернути помилку при невірному паролі', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test.login@example.com',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Невірний');
    });

    it('повинен повернути помилку при неіснуючому email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        })
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });
  });
});
