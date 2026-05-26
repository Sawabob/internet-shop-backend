module.exports = ({ productService }) => {
  return {
    getAllProducts: async (req, res) => {
      try {
        const products = await productService.getAllProducts();
        res.json(products);
      } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
      }
    },

    getProductById: async (req, res) => {
      try {
        const product = await productService.getProductById(req.params.id);
        res.json(product);
      } catch (error) {
        if (error.message === 'Продукт не знайдено') {
          return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
      }
    },

    createProduct: async (req, res) => {
      try {
        const product = await productService.createProduct(req.body);
        res.status(201).json({ message: 'Продукт створено', product });
      } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
      }
    },

    updateProduct: async (req, res) => {
      try {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.json({ message: 'Продукт оновлено', product });
      } catch (error) {
        if (error.message === 'Продукт не знайдено') {
          return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
      }
    },

    deleteProduct: async (req, res) => {
      try {
        await productService.deleteProduct(req.params.id);
        res.json({ message: 'Продукт видалено' });
      } catch (error) {
        if (error.message === 'Продукт не знайдено') {
          return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
      }
    }
  };
};
