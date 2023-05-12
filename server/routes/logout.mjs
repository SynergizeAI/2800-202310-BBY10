import express from 'express';


const router = express.Router();

router.post('/', (req, res) => {
  req.session.destroy((err) => {
    console.log("logging out")
    if (err) {
      res.status(500).json({ message: 'Error logging out.' });
      return;
    }
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully.' });
  });
});

export default router;