import express from 'express';
import auth from '../config/auth.js';
import {
  register,
  login,
  logout,
  getToken,
  updateStatus
} from '../controllers/user.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.get('/', getToken);
router.patch('/update/:id', auth, updateStatus);

export default router;
