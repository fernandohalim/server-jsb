import { Sequelize } from "sequelize";

const db = new Sequelize('server-jsb','root','',{
  host: 'localhost',
  dialect: 'mysql'
});

export default db;