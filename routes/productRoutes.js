import express from 'express';

import { getAllProducts, createProduct, deleteProduct, updateProduct, getProductsByCategory, getProductsById } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductsById);
router.post('/category', getProductsByCategory);
router.post('/', createProduct);
router.put('/', updateProduct);
router.delete('/', deleteProduct);

export default router;