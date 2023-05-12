import db from "../db/conn.mjs";
import getUserIdFromToken from "../utils/getUserIdFromToken.js";

export const sendMessage = async (req, res) => {
  const userId = getUserIdFromToken(req.cookies.token);
  try {
    const { chatSpaceId, text } = req.body;
    const newMessage = {
      user: userId,
      chatSpace: chatSpaceId,
      text: text,
      timestamp: new Date(),
    };

    const collection = await db.collection("messages");

    const result = await collection.insertOne(newMessage);

    const insertedId = await collection.findOne({ _id: result.insertedId });

    res.status(201).json(insertedId); // ops contains the documents inserted with added _id fields
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { chatSpaceId } = req.params;

    const collection = await db.collection("messages");

    const messages = await collection
      .find({ chatSpace: chatSpaceId })
      .sort({ timestamp: 1 }) // Sort messages by timestamp in ascending order
      .toArray();

    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

