import db from "../db/conn.mjs";
import generateUniqueCode from "../utils/generateUniqueCode.mjs";
import getUserIdFromToken from "../utils/getUserIdFromToken.js";
import { ObjectId } from "mongodb";

export const createChatSpace = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.cookies.token);

    const { title } = req.body;
    const newChatSpace = {
      title: title,
      code: await generateUniqueCode(5), // generate a random 5 character string
      members: [userId], // add the user who created the chat space as a member
    };

    const collection = await db.collection("chatSpaces");

    const result = await collection.insertOne(newChatSpace);

    const insertedId = await collection.findOne({ _id: result.insertedId });
    res.status(201).json(insertedId); // ops contains the documents inserted with added _id fields
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const joinChatSpace = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.cookies.token);
    const { code } = req.body;
    const chatSpace = await db.collection("chatSpaces").findOne({ code: code });

    if (!chatSpace) {
      return res.status(404).json({ message: "Chat space not found." });
    }

    // add the user to the chat space members if they're not already a member
    if (!chatSpace.members.includes(userId)) {
      const updatedChatSpace = await db
        .collection("chatSpaces")
        .findOneAndUpdate(
          { code: code },
          { $push: { members: userId } },
          { returnOriginal: false } // This option instructs the method to return the document after updates were applied.
        );

      return res.json(updatedChatSpace.value);
    }

    res.json(chatSpace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getChatSpace = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.cookies.token);
    const { id } = req.params;

    const collection = await db.collection("chatSpaces");

    const chatSpace = await collection.findOne({ _id: new ObjectId(id) });

    if (!chatSpace) {
      return res.status(404).json({ message: "Chat space not found." });
    }

    if (!chatSpace.members.includes(userId)) {
      return res.status(403).json({ message: "Forbidden." });
    }

    const members = await db
      .collection("users")
      .find({ userId: { $in: chatSpace.members } })
      .toArray();

    const populatedChatSpace = { ...chatSpace, members };

    res.json(populatedChatSpace);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const validateMembership = async (req, res) => {
  console.log("validateMembership");
  try {
    const { chatSpaceId } = req.query;
    const userId = getUserIdFromToken(req.cookies.token);

    const collection = await db.collection("chatSpaces");
    const chatSpace = await collection.findOne({
      _id: new ObjectId(chatSpaceId),
    }); // Wrap chatSpaceId with ObjectId()
    console.log(chatSpace);

    if (chatSpace.members.includes(userId)) {
      return res
        .status(200)
        .json({ message: "User is a member of this chat space." });
    } else {
      return res
        .status(403)
        .json({ message: "User is not a member of this chat space." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
