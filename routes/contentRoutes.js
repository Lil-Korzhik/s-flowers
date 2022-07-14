import express from 'express';
const router = express.Router();

import { getContent, createContent, updateContent, deleteContent, getContentByKey } from '../controllers/contentController.js';

router.get('/', getContent);
router.get('/:key', getContentByKey);
router.post('/', createContent);
router.put('/', updateContent);
router.delete('/', deleteContent);

export default router;