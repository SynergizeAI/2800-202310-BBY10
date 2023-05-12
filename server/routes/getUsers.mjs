import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { ids } = req.query;
    const userIds = ids.split(","); // Split the IDs into an array

    // Use userIds array to query the database and retrieve user details
    const users = await db
      .collection("users")
      .find({ userId: { $in: userIds } })
      .toArray();

    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
