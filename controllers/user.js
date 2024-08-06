import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import user from '../models/user.js';
import errorHandler from '../config/errorHandler.js';

export const register = async (req, res) => {
  try {
    const { username, password, role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await user.create({
      username,
      password: hashedPassword,
      role,
      status: "active"
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    errorHandler(res, error, "Failed to register user");
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const validate = await user.findOne({ where: { username } });

    if (!validate) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, validate.password);

    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign({ id: validate.id, username: validate.username }, 'your_secret_key', { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

    res.status(200).json({ message: "User logged in successfully", validate });
  } catch (error) {
    errorHandler(res, error, "Failed to login");
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    errorHandler(res, error, "Failed to logout");
  }
};

export const getToken = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "No token found" });
      return;
    }

    const decoded = jwt.verify(token, 'your_secret_key');
    console.log(decoded)

    const currentUser = await user.findOne({ where: { id: decoded.id } });

    if (!currentUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ token, user: currentUser });
  } catch (error) {
    errorHandler(res, error, "Failed to get token");
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await user.findAll({
      where: {
        status: 'active'
      },
      order: [['updatedAt', 'DESC']],
    });
    res.status(200).json(users);
  } catch (error) {
    errorHandler(res, error, "Failed to retrieve users list");
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const userToUpdate = await user.findByPk(id);

    if (!userToUpdate) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const newStatus = userToUpdate.status === 'active' ? 'inactive' : 'active';
    userToUpdate.status = newStatus;
    await userToUpdate.save();

    res.status(200).json({ message: "User status updated successfully", user: userToUpdate });
  } catch (error) {
    errorHandler(res, error, "Failed to update user status");
  }
};

