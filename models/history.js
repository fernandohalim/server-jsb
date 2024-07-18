import { Sequelize } from "sequelize";
import db from "../config/db.js";
import transaction from "./transaction.js";

const { DataTypes } = Sequelize;

const history = db.define(
  "history",
  {
    name: {
      type: DataTypes.STRING,
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

history.belongsTo(transaction, { foreignKey: 'transactionId', as: 'transaction' });

export default history;