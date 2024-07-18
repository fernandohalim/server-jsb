import transaction from '../models/transaction.js';
import user from '../models/user.js';
import history from "../models/history.js";
import errorHandler from '../config/errorHandler.js';
import db from "../config/db.js";

const resetAutoIncrement = async () => {
  await db.query('ALTER TABLE transaction AUTO_INCREMENT = 1', { raw: true });
};

export const createTransaction = async (req, res) => {
  const t = await db.transaction();

  try {
    const { name, description, amount, attachment, value, userId } = req.body;

    const newTransaction = await transaction.create({
      name,
      description,
      amount,
      attachment,
      value,
      status: "active",
      userId
    }, { transaction: t });

    const transactionUser = await user.findByPk(userId);

    const newHistory = await history.create({
      name: `${transactionUser.username} telah membuat transaksi baru dengan judul ${newTransaction.name}`,
      transactionId: newTransaction.id
    }, { transaction: t });

    await t.commit();

    res.status(201).json({
      message: "Transaction created successfully",
      transaction: newTransaction,
      history: newHistory
    });
  } catch (error) {
    await t.rollback();
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

export const updateTransaction = async (req, res) => {
  const t = await db.transaction();

  try {
    const { name, description, amount, attachment, value } = req.body;
    const { id } = req.params;

    const existingTransaction = await transaction.findByPk(id);
    if (!existingTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const transactionUser = await user.findByPk(existingTransaction.userId);

    const updatedTransaction = await existingTransaction.update({
      name: name || existingTransaction.name,
      description: description || existingTransaction.description,
      amount: amount || existingTransaction.amount,
      attachment: attachment || existingTransaction.attachment,
      value: value || existingTransaction.value
    }, { transaction: t });

    const newHistory = await history.create({
      name: `${transactionUser.username} telah mengubah transaksi dengan judul ${updatedTransaction.name}`,
      transactionId: updatedTransaction.id
    }, { transaction: t });

    await t.commit();

    res.status(200).json({
      message: "Transaction updated successfully",
      transaction: updatedTransaction,
      history: newHistory
    });
  } catch (error) {
    await t.rollback();
    errorHandler(res, error, "Failed to update Transaction");
  }
};

export const updateStatus = async (req, res) => {
  const t = await db.transaction();

  try {
    const { id } = req.params;

    const existingTransaction = await transaction.findByPk(id);
    if (!existingTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const transactionUser = await user.findByPk(existingTransaction.userId);

    const newStatus = existingTransaction.status === 'active' ? 'inactive' : 'active';

    await existingTransaction.update({ status: newStatus }, { transaction: t });

    const newHistory = await history.create({
      name: `${transactionUser.username} telah mengubah status transaksi dengan judul ${existingTransaction.name} menjadi ${newStatus}`,
      transactionId: existingTransaction.id
    }, { transaction: t });

    await t.commit();

    res.status(200).json({
      message: "Transaction status updated successfully",
      history: newHistory
    });
  } catch (error) {
    await t.rollback();
    errorHandler(res, error, "Failed to update Transaction status");
  }
};