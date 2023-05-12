import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController.mjs";

const router = express.Router();

router.get("/:chatSpaceId", getMessages);
router.post("/send", sendMessage);

export default router;

// messages are received directly on the client-side through Ably's Realtime service.

// Here's how it works:

// When a message is sent, it's first sent to your server via an API call
// (the POST /api/messages/send route).
// Your server then saves the message to the database and returns the message data.

// The client-side code then publishes the message to
// an Ably channel using the Ably Realtime service.

// Any clients that are subscribed to the same Ably channel
// will receive the message directly from Ably.

// The client-side code that's receiving the message does so by
// subscribing to the Ably channel and listening for 'message' events.
// When a 'message' event is received, the callback function is called with the message data.

// So, the flow of a message is: Client -> Your Server -> Ably -> Client(s).

// This architecture offloads the real-time messaging to Ably,
// which is designed to handle real-time data delivery at scale.
// Your server is only responsible for handling API calls and persisting data,
// which simplifies your server-side code and can improve performance.
