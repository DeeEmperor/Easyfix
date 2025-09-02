import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import protect from "../middleware/protect.js";
//import bcrypt from "bcryptjs";

const router = express.Router();
//protected route
router.get("/homepage", protect, async (req, res) => {
  try {
    // Get user details from database using the ID from JWT
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: `Hello ${user.firstname}`, user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
//login logic
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //check all the fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Did you forget to fill all fields?" });
    }
    //check if email is in the database
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        error: "Oops, it doesn't seem like you have an account with us.",
      });
    }
    //check if hasedpassword in db matches the hashed inputed password
    const isPasswordValid = await existingUser.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    //generate JWT
    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    //if all is well, send success response to the client
    const userResponse = {
      _id: existingUser._id,
      firstname: existingUser.firstname,
      lastname: existingUser.lastname,
      email: existingUser.email,
      role: existingUser.role,
    };

    //sending token and user info
    res.status(200).json({
      message: "Login successful",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//sgnup logic
router.post("/signup", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    //check for all fields
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    //create new user (password will be hashed by the pre-save middleware)
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: password,
      role: "customer",
    });

    await newUser.save();

    //generate JWT for new user
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const userResponse = {
      _id: newUser._id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    res.status(201).json({
      message: "User created successfully",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
