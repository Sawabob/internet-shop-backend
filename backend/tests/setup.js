// Налаштування для тестового середовища
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_jwt_secret_key_for_testing';

// Встановлення таймауту для всіх тестів
jest.setTimeout(30000);

// Глобальні налаштування перед запуском тестів
beforeAll(() => {
  console.log('🧪 Запуск тестового середовища...');
});

// Очищення після всіх тестів
afterAll(() => {
  console.log('✅ Тестування завершено');
});
