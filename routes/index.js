import express from 'express';
import user from './user.js';
import coa from './coa.js';

const router = express.Router();

router.use('/user', user);
router.use('/coa', coa);

export default router;
