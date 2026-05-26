# Швидкий старт проєкту

## Крок 1: Встановити залежності

Відкрити термінал PowerShell:
```powershell
cd C:\Users\PC\Downloads\internet-shop\backend
npm install
```

## Крок 2: Налаштувати .env файл

Перевірити файл `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/internet-shop?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

## Крок 3: Запустити Backend

```powershell
cd C:\Users\PC\Downloads\internet-shop\backend
npm start
```

Backend запуститься на http://localhost:5000

## Крок 4: Додати тестові дані (опціонально)

Відкрити новий термінал:
```powershell
cd C:\Users\PC\Downloads\internet-shop\backend
npm run seed
```

Це додасть 10 тестових продуктів до бази даних.

## Крок 5: Тестування API

### Через браузер:
- http://localhost:5000/ - перевірити, що API працює
- http://localhost:5000/api/products - отримати список продуктів

### Через Postman або curl:

**Реєстрація:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Олександр\",\"email\":\"test@example.com\",\"password\":\"123456\"}"
```

**Вхід:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"123456\"}"
```

**Отримати продукти:**
```bash
curl http://localhost:5000/api/products
```

## Якщо щось не працює

### Backend помилка підключення до БД
- Переконайтеся, що MONGODB_URI правильний у файлі `.env`
- Перевірте, що у вас є доступ до MongoDB Atlas

### Помилка "Cannot find module 'awilix'"
- Виконайте `npm install` у папці backend

## Готово!

Тепер ви можете користуватися API інтернет-магазину:
- ✅ Реєстрація та вхід
- ✅ Перегляд каталогу товарів
- ✅ CRUD операції з продуктами
- ✅ Управління кошиком
- ✅ JWT аутентифікація
- ✅ Dependency Injection через Awilix
