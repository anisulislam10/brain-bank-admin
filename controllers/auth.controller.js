import User from "../models/user.model.js";
import { generateToken } from "../utils/jwtUtils.js";

export const registerSuperAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Superadmin already exists" });
    }

    const newUser = new User({
      username,
      password,
      role: "superadmin",  
    });

    // Save the superadmin to the database
    await newUser.save();

    return res.status(201).json({ message: "Superadmin registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginSuperAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || user.role !== "superadmin") {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    return res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
