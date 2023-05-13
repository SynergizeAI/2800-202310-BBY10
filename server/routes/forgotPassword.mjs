import express from 'express';
import bcrypt from 'bcrypt';
import db from "../db/conn.mjs";
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
  console.log('POST /forgot-password');
  const { email } = req.body;

  let resetToken; // Define resetToken here

  try {
    console.log('Connecting to database...');
    const usersCollection = db.collection("users");

    // Check if a user with the provided email exists
    console.log('Checking if user exists...');
    const user = await usersCollection.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'No user found with this email address.' });
      return;
    }

    resetToken = jwt.sign({ id: user.userId }, SECRET_KEY, { expiresIn: '1h' }); // Assign the value here

    // const encodedToken = encodeURIComponent(resetToken);

    console.log('Updating user with reset token...');
    await usersCollection.updateOne(
      { email },
      { $set: { passwordResetToken: resetToken, passwordResetTokenExpires: Date.now() + 3600000 } }
    );
    console.log(resetToken);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user with reset token.' });
  }

  // Set SendGrid API key
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // Send an email to the user with the password reset link containing the token
  const msg = {
    to: email,
    from: 'dagunthery@gmail.com',
    subject: 'Password Reset',
    text: `Please click the following link to reset your password: http://localhost:5173/reset-password?token=${resetToken}`,
    html: `<strong>Please click the following link to reset your password: <a href="http://localhost:5173/reset-password?token=${resetToken}">Reset Password</a></strong>`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Password reset email sent.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending password reset email.' });
  }
});

export default router;
