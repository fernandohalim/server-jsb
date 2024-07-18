import transaction from '../models/transaction.js';
import user from '../models/user.js';
import errorHandler from '../config/errorHandler.js';
import db from "../config/db.js";

const resetAutoIncrement = async () => {
  await db.query('ALTER TABLE coa AUTO_INCREMENT = 1', { raw: true });
};

export const createTransaction = async (req, res) => {
  try {
    const { name, description, amount, attachment, value, userId } = req.body;

    const newTransaction = await transaction.create({ 
      name, 
      description, 
      amount, 
      attachment, 
      value, 
      userId
    });

    res.status(201).json({ message: "Transaction created successfully", transaction: newTransaction });
  } catch (error) {
    errorHandler(res, error, "Failed to create Transaction");
  }
};

export const getTransaction = async (req, res) => {
  try {
    const transactions = await transaction.findAll({
      include: [
        {
          model: user,
          as: 'user',
          attributes: ['username', 'role']
        }
      ]
    });
    res.status(200).json(transactions);
  } catch (error) {
    errorHandler(res, error, "Failed to retrieve transaction list");
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transactionDetails = await transaction.findByPk(id, {
      include: [
        {
          model: user,
          as: 'user',
          attributes: ['username', 'role']
        }
      ]
    });

    if (!transactionDetails) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(transactionDetails);
  } catch (error) {
    errorHandler(res, error, "Failed to retrieve transaction details");
  }
};