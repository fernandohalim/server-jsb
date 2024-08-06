import express from 'express';
import auth from '../config/auth.js';
import {
  register,
  login,
  logout,
  getToken,
  updateStatus,
  getUser
} from '../controllers/user.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.get('/', getToken);
router.get('/fetch', getUser);
router.patch('/update/:id', auth, updateStatus);

export default router;
