import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import user from './user.mjs';

const router = express.Router();

// This is your secret key for JWT, you should store it securely
// For instance, you can store it in environment variables
const SECRET_KEY = process.env.JWT_SECRET;

// Route to handle password reset
router.post('/', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  try {
    // We verify the token and get the id from the payload
    const { id } = jwt.verify(token, SECRET_KEY);

    // We find the user by id
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // We hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // We update the user's password
    user.password = hashedPassword;

    // We save the updated user in the database
    await user.save();

    res.send({ message: 'Password reset successful' });
  } catch (error) {
    // This error will occur if the token is invalid or expired
    res.status(400).send({ message: 'Invalid or expired token' });
  }
});

export default router;