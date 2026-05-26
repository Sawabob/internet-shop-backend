module.exports = ({ cartService }) => {
  return {
    getCart: async (req, res) => {
      try {
        const cart = await cartService.getCart(req.userId);
        res.json(cart);
      } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
      }
    },

    addToCart: async (req, res) => {
      try {
        const { productId, quantity } = req.body;
        const cart = await cartService.addToCart(req.userId, productId, quantity);
        res.json({ message: 'Товар додано до кошика', cart });
      } catch (error) {
        if (error.message === 'Продукт не знайдено') {
          return res.status(404).json({ message: error.message });
        }
        if (error.message === 'Недостатньо товару на складі') {
          return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
      }
    },

    updateCartItem: async (req, res) => {
      try {
        const { productId, quantity } = req.body;
        const cart = await cartService.updateCartItem(req.userId, productId, quantity);
        res.json({ message: 'Кошик оновлено', cart });
      } catch (error) {
        if (error.message === 'Кошик не знайдено' || error.message === 'Товар не знайдено в кошику') {
          return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
      }
    },

    removeFromCart: async (req, res) => {
      try {
        const { productId } = req.params;
        const cart = await cartService.removeFromCart(req.userId, productId);
        res.json({ message: 'Товар видалено з кошика', cart });
      } catch (error) {
        if (error.message === 'Кошик не знайдено') {
          return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
      }
    },

    clearCart: async (req, res) => {
      try {
        const cart = await cartService.clearCart(req.userId);
        res.json({ message: 'Кошик очищено', cart });
      } catch (error) {
        if (error.message === 'Кошик не знайдено') {
          return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
      }
    }
  };
};
