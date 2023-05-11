import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Add this import

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email });

    if (!user) {
      res.status(401).json({ message: 'Invalid username or password.' });
      return;
    }

    const userPassword = user.password;
    const isValidPassword = await bcrypt.compare(password, userPassword);

    if (!isValidPassword) {
      res.status(401).json({ message: 'Invalid username or password.' });
      return;
    }

    // Generate a JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Store the JWT in the session
    req.session.jwt = token;

    res.status(200).json({ message: 'Login successful.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;
