import React, { useState } from "react";
import axios from "axios";
import getAblyRealtime from "../../utils/ably";

function SendMessageForm({ chatSpaceId }) {
  const [text, setText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send the message to the server
      const response = await axios.post("/api/messages/send", {
        chatSpaceId,
        text,
      });

      // Publish the message to the Ably channel
      const realtime = await getAblyRealtime(chatSpaceId);
      const channel = realtime.channels.get(`private-${chatSpaceId}`);
      await channel.publish("message", response.data);
      // .then(() => {
      //   console.log("Message published");
      // })
      // .catch((err) => {
      //   console.log("Error publishing message:", err);
      // });

      setText("");
    } catch (error) {
      // handle error (e.g. display an error message to the user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default SendMessageForm;
