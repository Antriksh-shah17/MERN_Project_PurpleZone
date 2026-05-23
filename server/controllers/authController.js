import bcrypt from "bcryptjs";
import User from "../models/User.js";

function sanitizeUser(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email
  };
}

export async function registerUser(request, response, next) {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 6) {
      return response.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return response.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return response.status(201).json({
      message: "Registration successful.",
      user: sanitizeUser(user)
    });
  } catch (error) {
    return next(error);
  }
}

export async function loginUser(request, response, next) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return response.status(401).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response.status(401).json({ message: "Invalid email or password." });
    }

    return response.json({
      message: "Login successful.",
      user: sanitizeUser(user)
    });
  } catch (error) {
    return next(error);
  }
}
