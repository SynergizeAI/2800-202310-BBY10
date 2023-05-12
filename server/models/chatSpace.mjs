import mongoose from 'mongoose';

const chatSpaceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
});

const ChatSpace = mongoose.model('ChatSpace', chatSpaceSchema);
export default ChatSpace;
