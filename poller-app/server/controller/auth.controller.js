import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config.js";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, config.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
