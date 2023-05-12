import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ username });

    if (!user) {
      res.status(401).json({ message: "Invalid username or password." });
      return;
    }

    const userPassword = user.password;
    const isValidPassword = await bcrypt.compare(password, userPassword);

    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid username or password." });
      return;
    }

    // Generate a JWT
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set the JWT as a cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour
      secure: false, // set to true when deploying to production
    });

    res.status(200).json({ message: "Login successful."});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
