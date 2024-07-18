import coa from '../models/coa.js';
import errorHandler from '../config/errorHandler.js';
import db from "../config/db.js";

const resetAutoIncrement = async () => {
  await db.query('ALTER TABLE coa AUTO_INCREMENT = 1', { raw: true });
};

export const createCoa = async (req, res) => {
  try {
    const { name, code } = req.body;

    const newCoa = await coa.create({ name, code });

    res.status(201).json({ message: "CoA created successfully", coa: newCoa });
  } catch (error) {
    errorHandler(res, error, "Failed to create CoA");
  }
};

export const getCoa = async (req, res) => {
  try {
    const coas = await coa.findAll();
    res.status(200).json(coas);
  } catch (error) {
    errorHandler(res, error, "Failed to retrieve CoA list");
  }
};

export const getCoaById = async (req, res) => {
  try {
    const { id } = req.params;
    const coaRecord = await coa.findByPk(id);

    if (!coaRecord) {
      res.status(404).json({ message: "CoA not found" });
      return;
    }

    res.status(200).json(coaRecord);
  } catch (error) {
    errorHandler(res, error, "Failed to retrieve CoA by ID");
  }
};

export const updateCoa = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code } = req.body;

    const coaRecord = await coa.findByPk(id);

    if (!coaRecord) {
      res.status(404).json({ message: "CoA not found" });
      return;
    }

    coaRecord.name = name;
    coaRecord.code = code;
    await coaRecord.save();

    res.status(200).json({ message: "CoA updated successfully", coa: coaRecord });
  } catch (error) {
    errorHandler(res, error, "Failed to update CoA");
  }
};

export const deleteCoa = async (req, res) => {
  try {
    const { id } = req.params;

    const coaRecord = await coa.findByPk(id);

    if (!coaRecord) {
      res.status(404).json({ message: "CoA not found" });
      return;
    }

    await coaRecord.destroy();
    res.status(200).json({ message: "CoA deleted successfully" });
  } catch (error) {
    errorHandler(res, error, "Failed to delete CoA");
  }
};