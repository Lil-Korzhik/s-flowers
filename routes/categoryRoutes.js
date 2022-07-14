import express from 'express';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/categoryController.js';
const router = express.Router();

router.get('/', getCategories);
router.post('/', createCategory);
router.put('/', updateCategory);
router.delete('/', deleteCategory);

export default router;