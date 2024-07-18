import express from 'express';
import auth from '../config/auth.js';
import {
  createTransaction,
  getTransaction,
  getTransactionById,
  updateTransaction,
  updateStatus
} from '../controllers/transaction.js';

const router = express.Router();

router.post('/', auth, createTransaction);
router.get('/', auth, getTransaction);
router.get('/:id', auth, getTransactionById);
router.patch('/:id', auth, updateTransaction);
router.patch('/status/:id', auth, updateStatus);

export default router;
