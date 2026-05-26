# Dependency Injection Container

Цей проєкт використовує **Awilix** для управління залежностями (Dependency Injection).

## Встановлення

Перед запуском проєкту встановіть Awilix:

```bash
cd backend
npm install awilix --save
```

## Структура DI

### Контейнер (`container.js`)

Контейнер реєструє всі залежності:
- **Models**: User, Product, Cart
- **Services**: AuthService, ProductService, CartService
- **Controllers**: authController, productController, cartController
- **Middleware**: authMiddleware

### Services

Сервіси містять бізнес-логіку та отримують залежності через конструктор:

- `AuthService` - аутентифікація та реєстрація
- `ProductService` - управління продуктами
- `CartService` - управління кошиком

### Controllers

Контролери отримують сервіси через DI та обробляють HTTP запити.

## Переваги DI

1. **Тестування**: легко замінити реальні залежності на mock об'єкти
2. **Розділення відповідальностей**: кожен компонент має чітку роль
3. **Гнучкість**: легко змінювати реалізації без зміни коду
4. **Повторне використання**: сервіси можна використовувати в різних контролерах

## Приклад використання

```javascript
// Отримання залежності з контейнера
const authController = container.resolve('authController');

// Сервіс автоматично отримує свої залежності
class AuthService {
  constructor({ userModel }) {
    this.User = userModel;
  }
}
```
