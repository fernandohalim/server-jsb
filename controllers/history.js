import transaction from '../models/transaction.js';
import history from "../models/history.js";
import errorHandler from '../config/errorHandler.js';
import db from "../config/db.js";

const resetAutoIncrement = async () => {
  await db.query('ALTER TABLE transaction AUTO_INCREMENT = 1', { raw: true });
};

export const getHistory = async (req, res) => {
  try {
    const histories = await history.findAll({
      include: [
        {
          model: transaction,
          as: 'transaction',
          attributes: ['name', 'value', 'amount', 'description', 'status', 'attachment']
        }
      ],
      order: [['updatedAt', 'DESC']],
    });
    res.status(200).json(histories);
  } catch (error) {
    errorHandler(res, error, "Failed to retrieve history list");
  }
};

export const getHistoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const historyDetails = await history.findByPk(id, {
      include: [
        {
          model: transaction,
          as: 'transaction',
          attributes: ['name', 'value', 'amount', 'description', 'status']
        }
      ]
    });

    if (!historyDetails) {
      return res.status(404).json({ message: "History not found" });
    }

    res.status(200).json(historyDetails);
  } catch (error) {
    errorHandler(res, error, "Failed to retrieve history details");
  }
};