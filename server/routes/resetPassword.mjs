import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import User from './user.mjs';
import db from '../db/conn.mjs';

const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
  const { token, newPassword } = req.body;
  const usersCollection = db.collection("users");

  if (!token || !newPassword) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  try {
    console.log('Token received:', token); // Log the received token
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('Decoded token:', decoded); // Log the decoded token

    const { id } = decoded;
    console.log(id)

    // const user = await User.findOne({ _id: id });

    const user = await usersCollection.findOne(
      { userId: id },
      { projection: { password: 0 } } // exclude password field
    );

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log(hashedPassword);

    user.password = hashedPassword;

    await usersCollection.updateOne(
      { userId: id },
      { $set: { password: hashedPassword } }
    );

    res.send({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error in resetPassword route:', error); // Log the error
    res.status(400).send({ message: 'Invalid or expired token' });
  }
});

export default router;
