import transaction from "../models/transaction.js";
import user from "../models/user.js";
import history from "../models/history.js";
import journal from "../models/journal.js";
import errorHandler from "../config/errorHandler.js";
import db from "../config/db.js";
import multer from "multer";
import path from "path";

const resetAutoIncrement = async () => {
  await db.query("ALTER TABLE transaction AUTO_INCREMENT = 1", { raw: true });
};

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./uploads/"),
    filename: (req, file, cb) =>
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      ),
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const isMimeType = allowedTypes.test(file.mimetype);
    const isExtName = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (isMimeType && isExtName) cb(null, true);
    else cb(new Error("Only images are allowed!"));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("attachment");

export const createTransaction = async (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return errorHandler(res, err, "Failed to upload file");
    } else if (err) {
      return errorHandler(res, err, "An unexpected error occurred");
    }

    const t = await db.transaction();

    try {
      const { name, description, amount, value, userId } = req.body;
      const { coaId1, coaId2 } = req.body;
      const { value1, value2 } = req.body;
      const attachment = req.file ? req.file.path.replace(/\\/g, "/") : null;

      const newTransaction = await transaction.create(
        {
          name,
          description,
          amount,
          attachment,
          value,
          status: "active",
          userId,
        },
        { transaction: t }
      );

      const transactionUser = await user.findByPk(userId);

      const newHistory = await history.create(
        {
          name: `${transactionUser.username} telah membuat transaksi baru dengan judul ${newTransaction.name}`,
          transactionId: newTransaction.id,
        },
        { transaction: t }
      );

      const newJournal1 = await journal.create(
        {
          amount: amount,
          value: value1,
          coaId: coaId1,
          transactionId: newTransaction.id,
        },
        { transaction: t }
      );

      const newJournal2 = await journal.create(
        {
          amount: amount,
          value: value2,
          coaId: coaId2,
          transactionId: newTransaction.id,
        },
        { transaction: t }
      );

      await t.commit();

      res.status(201).json({
        message: "Transaction created successfully",
        transaction: newTransaction,
        history: newHistory,
        journal_debit: newJournal1,
        journal_credit: newJournal2,
      });
    } catch (error) {
      await t.rollback();
      errorHandler(res, error, "Failed to create Transaction");
    }
  });
};

export const getTransaction = async (req, res) => {
  try {
    const transactions = await transaction.findAll({
      where: {
        status: 'active'
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: ["username", "role"],
        },
      ],
      order: [['updatedAt', 'DESC']],
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
          as: "user",
          attributes: ["username", "role"],
        },
      ],
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
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return errorHandler(res, err, "Failed to upload file");
    } else if (err) {
      return errorHandler(res, err, "An unexpected error occurred");
    }

    const t = await db.transaction();

    try {
      const { name, description, amount, value } = req.body;
      const { id } = req.params;

      const existingTransaction = await transaction.findByPk(id);
      if (!existingTransaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      const transactionUser = await user.findByPk(existingTransaction.userId);

      const attachment = req.file
        ? req.file.path.replace(/\\/g, "/")
        : existingTransaction.attachment;

      const updatedTransaction = await existingTransaction.update(
        {
          name: name || existingTransaction.name,
          description: description || existingTransaction.description,
          amount: amount || existingTransaction.amount,
          attachment: attachment,
          value: value || existingTransaction.value,
        },
        { transaction: t }
      );

      const newHistory = await history.create(
        {
          name: `${transactionUser.username} telah mengubah transaksi dengan judul ${updatedTransaction.name}`,
          transactionId: updatedTransaction.id,
        },
        { transaction: t }
      );

      await t.commit();

      res.status(200).json({
        message: "Transaction updated successfully",
        transaction: updatedTransaction,
        history: newHistory,
      });
    } catch (error) {
      await t.rollback();
      errorHandler(res, error, "Failed to update Transaction");
    }
  });
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

    const newStatus =
      existingTransaction.status === "active" ? "inactive" : "active";

    if (newStatus === "inactive") {
      await journal.destroy({ where: { transactionId: existingTransaction.id }, transaction: t });
    }

    await existingTransaction.update({ status: newStatus }, { transaction: t });

    const newHistory = await history.create(
      {
        name: `${transactionUser.username} telah mengubah status transaksi dengan judul ${existingTransaction.name} menjadi ${newStatus}`,
        transactionId: existingTransaction.id,
      },
      { transaction: t }
    );

    await t.commit();

    res.status(200).json({
      message: "Transaction status updated successfully",
      history: newHistory,
    });
  } catch (error) {
    await t.rollback();
    errorHandler(res, error, "Failed to update Transaction status");
  }
};
