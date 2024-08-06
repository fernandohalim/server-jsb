import transaction from '../models/transaction.js';
import journal from "../models/journal.js";
import coa from "../models/coa.js";
import errorHandler from '../config/errorHandler.js';
import db from "../config/db.js";

const resetAutoIncrement = async () => {
  await db.query('ALTER TABLE transaction AUTO_INCREMENT = 1', { raw: true });
};

export const getJournal = async (req, res) => {
  try {
    const journals = await journal.findAll({
      include: [
        {
          model: transaction,
          as: 'transaction',
          attributes: ['name', 'value', 'amount', 'description', 'status', 'attachment']
        },
        {
          model: coa,
          as: 'coa',
          attributes: ['code', 'name']
        }
      ],
      order: [['updatedAt', 'DESC']],
    });
    res.status(200).json(journals);
  } catch (error) {
    errorHandler(res, error, "Failed to retrieve history list");
  }
};

