// controllers/authController.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });

export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) return res.status(400).json({ success: false, message: "User already exists" });

    const user = await User.create({ name, email, password, phone });
    const token = generateToken(user._id);

    res.status(201).json({ success: true, message: "User registered", data: { token, user } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Registration failed", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.json({ success: true, message: "Login successful", data: { token, user } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed", error: err.message });
  }
};
