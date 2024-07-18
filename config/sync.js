import db from "./db.js"
import errorHandler from "./errorHandler.js";

const sync = async () => {
  try {
    await db.sync({ alter: true });
    console.log("Database synchronized successfully");
  } catch (error) {
    errorHandler({ status: 500 }, error, "Error synchronizing database");
    process.exit(1);
  }
};

export default sync;
