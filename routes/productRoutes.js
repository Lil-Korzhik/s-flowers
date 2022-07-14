import express from 'express';

import { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/', updateProduct);
router.delete('/', deleteProduct);

export default router;