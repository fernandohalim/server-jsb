import express from 'express';
import auth from '../config/auth.js';
import {
  createTransaction,
  getTransaction,
  getTransactionById
} from '../controllers/transaction.js';

const router = express.Router();

router.post('/', auth, createTransaction);
router.get('/', auth, getTransaction);
router.get('/:id', auth, getTransactionById);

export default router;
