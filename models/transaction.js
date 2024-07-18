import { Sequelize } from "sequelize";
import db from "../config/db.js";
import user from "./user.js";

const { DataTypes } = Sequelize;

const transaction = db.define(
  "transaction",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    userId: {
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

transaction.belongsTo(user, { foreignKey: 'userId', as: 'user' });

export default transaction;