# Інтернет-магазин - Backend API

Проєкт виконав: **Бондаренко Олександр Артемович**, група **КН-31**

## Опис проєкту

REST API для управління інтернет-магазином. Система містить інформацію про клієнтів, продукти та їх кошики покупок.

## Технологічний стек

- **Node.js** v24.15.0
- **Express.js** v5.2.1 - веб-фреймворк
- **MongoDB Atlas** + **Mongoose** - база даних
- **Awilix** - Dependency Injection контейнер
- **JWT** - аутентифікація
- **bcryptjs** - хешування паролів
- **CORS** - підтримка крос-доменних запитів

## Структура проєкту

```
internet-shop/
├── backend/
│   ├── config/          # Конфігурація БД
│   ├── controllers/     # Контролери (HTTP обробники)
│   ├── services/        # Бізнес-логіка (DI)
│   ├── middleware/      # Middleware (аутентифікація)
│   ├── models/          # Моделі MongoDB
│   ├── routes/          # API маршрути
│   ├── container.js     # DI контейнер (Awilix)
│   ├── server.js        # Точка входу сервера
│   ├── .env             # Змінні оточення
│   └── package.json
│
├── .gitignore
└── README.md
```

## Функціональність

### Аутентифікація
- Реєстрація користувачів
- Вхід в систему
- JWT токени для безпеки

### Управління продуктами
- Перегляд каталогу товарів
- CRUD операції для продуктів (для авторизованих користувачів)
- Фільтрація за категоріями
- Інформація про наявність на складі

### Кошик покупок
- Додавання товарів до кошика
- Зміна кількості товарів
- Видалення товарів
- Підрахунок загальної суми
- Персональний кошик для кожного користувача

## Встановлення та запуск

### Передумови
- Node.js v24+ встановлений
- Доступ до MongoDB Atlas

### 1. Клонувати репозиторій
```bash
git clone https://github.com/Sawabob/internet-shop.git
cd internet-shop/backend
```

### 2. Встановити залежності

```bash
npm install
```

### 3. Налаштувати змінні оточення

Створити файл `.env` у папці `backend`:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/internet-shop?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

### 4. Запустити сервер

```bash
npm start
```

Backend запуститься на http://localhost:5000

### 5. Додати тестові дані (опціонально)

```bash
npm run seed
```

## API Endpoints

### Аутентифікація
- `POST /api/auth/register` - Реєстрація
- `POST /api/auth/login` - Вхід

### Продукти
- `GET /api/products` - Отримати всі продукти
- `GET /api/products/:id` - Отримати продукт за ID
- `POST /api/products` - Створити продукт (потрібна авторизація)
- `PUT /api/products/:id` - Оновити продукт (потрібна авторизація)
- `DELETE /api/products/:id` - Видалити продукт (потрібна авторизація)

### Кошик
- `GET /api/cart` - Отримати кошик (потрібна авторизація)
- `POST /api/cart/add` - Додати товар (потрібна авторизація)
- `PUT /api/cart/update` - Оновити кількість (потрібна авторизація)
- `DELETE /api/cart/remove/:productId` - Видалити товар (потрібна авторизація)
- `DELETE /api/cart/clear` - Очистити кошик (потрібна авторизація)

## Архітектура

### Backend (REST API)
- **MVC + Services патерн**: Models, Services, Controllers, Routes
- **Dependency Injection**: Awilix контейнер для управління залежностями
- **Middleware**: Аутентифікація через JWT
- **База даних**: MongoDB Atlas з Mongoose ODM

### Шари архітектури:
1. **Routes** - визначають HTTP endpoints
2. **Controllers** - обробляють HTTP запити/відповіді
3. **Services** - містять бізнес-логіку (ін'єктуються через DI)
4. **Models** - схеми даних MongoDB

## Безпека

- Паролі хешуються за допомогою bcryptjs
- JWT токени для аутентифікації
- CORS налаштований для захисту API
- Валідація даних на рівні моделей Mongoose

## Автор

**Бондаренко Олександр Артемович**  
Група: КН-31  
Навчальний заклад: Фаховий передвищий коледж "Оптіма"  
Дисципліна: Навчальна практика з програмування. Частина 2

## Дата створення

Травень 2026
"# internet-shop" 
