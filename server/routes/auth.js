import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const router = express.Router();

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
        error: "Oops, it doesn't seem like you have  an account with us.",
      });
    }
    //check if hasedpassword in db matches the hashed inputed password
    const isPasswordValid = await existingUser.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }
    
    //if all is well, send success response to the client
    const userResponse = {
      _id: existingUser._id,
      firstname: existingUser.firstname,
      lastname: existingUser.lastname,
      email: existingUser.email,
      role: existingUser.role,
    };

    res.status(200).json({
      message: "Login successful",
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
      user: userResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
