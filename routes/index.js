import express from 'express';
import user from './user.js';
import coa from './coa.js';
import transaction from './transaction.js';
import history from './history.js'
import journal from './journal.js'

const router = express.Router();

router.use('/user', user);
router.use('/coa', coa);
router.use('/transaction', transaction);
router.use('/history', history);
router.use('/journal', journal);

export default router;
