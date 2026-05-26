const express = require('express');
const container = require('../container');

const router = express.Router();
const productController = container.resolve('productController');
const authMiddleware = container.resolve('authMiddleware');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', authMiddleware, productController.createProduct);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
