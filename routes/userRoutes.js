import express from 'express';

import { registerUser } from '../controllers/user/regController.js';
import { loginUser } from '../controllers/user/loginController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;