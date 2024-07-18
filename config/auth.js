import jwt from 'jsonwebtoken';
import errorHandler from '../config/errorHandler.js';

const auth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    errorHandler(res, error, "Failed to authenticate token");
  }
};

export default auth;
