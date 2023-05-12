//gpt4 response
import express from "express";
import db from "../db/conn.mjs";
import jwt from "jsonwebtoken";
import "../loadEnvironment.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  // Get the authorization token from header
  const token = req.cookies.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne(
      { userId },
      { projection: { password: 0 } } // exclude password field
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/", async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;
  const { name, email, bio } = req.body;

  try {
    const usersCollection = db.collection("users");
    const updateResult = await usersCollection.updateOne(
      { userId },
      {
        $set: { name, email, bio },
      }
    );

    if (updateResult.matchedCount === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const updatedUser = await usersCollection.findOne(
      { userId },
      {
        projection: { password: 0 },
      }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
