// signup.mjs
import express from 'express';
import db from '../db/conn.mjs';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// Instantiate a new router (middleware that only acts on routes)
const router = express.Router();

// Handle POST requests to /signup
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Get the users collection from the database
    const usersCollection = db.collection('users');

    // Check if the email already exists in the database
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Email is already in use.' });
      return;
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a new user ID
    const userId = uuidv4();

    // Create a new user object
    const newUser = {
      userId,
      name,
      email,
      password: hashedPassword,
      bio: '',
    };

    // Insert the new user into the database
    await usersCollection.insertOne(newUser);

    res.status(201).json({ message: 'User created successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;
