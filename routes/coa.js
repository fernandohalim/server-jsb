import express from 'express';
import auth from '../config/auth.js';
import {
  createCoa,
  getCoa,
  getCoaById,
  updateCoa,
  deleteCoa
} from '../controllers/coa.js';

const router = express.Router();

router.post('/', auth, createCoa);
router.get('/', auth, getCoa);
router.get('/:id', auth, getCoaById);
router.patch('/:id', auth, updateCoa);
router.delete('/:id', auth, deleteCoa);

export default router;
