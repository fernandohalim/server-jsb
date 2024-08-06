import { Sequelize } from "sequelize";
import db from "../config/db.js";
import transaction from "./transaction.js";
import coa from "./coa.js";

const { DataTypes } = Sequelize;

const journal = db.define(
  "journal",
  {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    coaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    transactionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

journal.belongsTo(transaction, { foreignKey: 'transactionId', as: 'transaction' });
journal.belongsTo(coa, { foreignKey: 'coaId', as: 'coa' });

export default journal;