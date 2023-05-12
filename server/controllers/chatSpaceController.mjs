import ChatSpace from '../models/chatSpace.mjs';

export const createChatSpace = async (req, res) => {
  try {
    const { title } = req.body;
    const newChatSpace = new ChatSpace({
      title: title,
      code: Math.random().toString(36).substr(2, 5), // generate a random 5 character string
      members: [req.session.userId], // add the user who created the chat space as a member
    });

    const chatSpace = await newChatSpace.save();
    res.status(201).json(chatSpace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const joinChatSpace = async (req, res) => {
  try {
    const { code } = req.body;
    const chatSpace = await ChatSpace.findOne({ code: code });

    if (!chatSpace) {
      return res.status(404).json({ message: 'Chat space not found.' });
    }

    // add the user to the chat space members if they're not already a member
    if (!chatSpace.members.includes(req.session.userId)) {
      chatSpace.members.push(req.session.userId);
      await chatSpace.save();
    }

    res.json(chatSpace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};