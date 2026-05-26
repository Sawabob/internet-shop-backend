# Backend - Інтернет-магазин

## Технології
- Node.js v24.15.0
- Express.js v5.2.1
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs для хешування паролів

## Структура проєкту
```
backend/
├── config/          # Конфігурація (підключення до БД)
├── controllers/     # Контролери (бізнес-логіка)
├── middleware/      # Middleware (аутентифікація)
├── models/          # Моделі MongoDB (User, Product, Cart)
├── routes/          # Маршрути API
├── .env             # Змінні оточення
├── server.js        # Головний файл сервера
└── package.json     # Залежності проєкту
```

## API Endpoints

### Аутентифікація
- `POST /api/auth/register` - Реєстрація користувача
- `POST /api/auth/login` - Вхід користувача

### Продукти
- `GET /api/products` - Отримати всі продукти
- `GET /api/products/:id` - Отримати продукт за ID
- `POST /api/products` - Створити продукт (потрібна авторизація)
- `PUT /api/products/:id` - Оновити продукт (потрібна авторизація)
- `DELETE /api/products/:id` - Видалити продукт (потрібна авторизація)

### Кошик
- `GET /api/cart` - Отримати кошик користувача (потрібна авторизація)
- `POST /api/cart/add` - Додати товар до кошика (потрібна авторизація)
- `PUT /api/cart/update` - Оновити кількість товару (потрібна авторизація)
- `DELETE /api/cart/remove/:productId` - Видалити товар з кошика (потрібна авторизація)
- `DELETE /api/cart/clear` - Очистити кошик (потрібна авторизація)

## Встановлення та запуск

### 1. Встановити MongoDB
Завантажити з https://www.mongodb.com/try/download/community або використати MongoDB Atlas (хмарна версія)

### 2. Налаштувати змінні оточення
Файл `.env` вже створений з базовими налаштуваннями:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/internet-shop
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

### 3. Запустити сервер
```bash
npm start
```

Сервер запуститься на http://localhost:5000

## Приклади запитів

### Реєстрація
```json
POST /api/auth/register
{
  "name": "Олександр",
  "email": "test@example.com",
  "password": "123456"
}
```

### Створення продукту
```json
POST /api/products
Headers: { "Authorization": "Bearer YOUR_TOKEN" }
{
  "name": "Ноутбук",
  "description": "Потужний ноутбук для роботи",
  "price": 25000,
  "category": "Електроніка",
  "stock": 10,
  "imageUrl": "https://example.com/laptop.jpg"
}
```

### Додати до кошика
```json
POST /api/cart/add
Headers: { "Authorization": "Bearer YOUR_TOKEN" }
{
  "productId": "PRODUCT_ID",
  "quantity": 2
}
```
