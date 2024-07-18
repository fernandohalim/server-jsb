import express from 'express';
import auth from '../config/auth.js';
import {
  getHistory,
  getHistoryById
} from '../controllers/history.js';

const router = express.Router();

router.get('/', auth, getHistory);
router.get('/:id', auth, getHistoryById);

export default router;
