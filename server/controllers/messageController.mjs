import Message from '../models/message.mjs';

export const sendMessage = async (req, res) => {
  try {
    const { chatSpaceId, text } = req.body;
    const newMessage = new Message({
      user: req.session.userId,
      chatSpace: chatSpaceId,
      text: text,
      timestamp: new Date(),
    });

    const message = await newMessage.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
