import express from 'express';
import auth from '../config/auth.js';
import {
  getJournal,
} from '../controllers/journal.js';

const router = express.Router();

router.get('/', auth, getJournal);

export default router;
