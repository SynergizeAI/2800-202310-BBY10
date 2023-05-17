// client-side scripting
'use client';

import axios from "axios";
import { useEffect, useRef, useState } from "react";

import useConversation from "@/app/hooks/useConversation";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";

/**
 * Component for displaying the body of a conversation.
 *
 * @param {Object[]} initialMessages - The initial list of messages to display.
 * @returns {React.FC} The React component.
 */
const Body: React.FC<{ initialMessages: FullMessageType[] }> = ({ initialMessages = [] }) => {
  // Reference to the bottom of the message list
  const bottomRef = useRef<HTMLDivElement>(null);

  // State for the list of messages
  const [messages, setMessages] = useState(initialMessages);

  // Get the conversation ID from the conversation context
  const { conversationId } = useConversation();

  // Effect to mark the conversation as seen whenever the conversation ID changes
  useEffect(() => {
    // Post a request to mark the conversation as seen
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  /**
   * Handler for updating a message.
   *
   * @param {Object} newMessage - The updated message.
   */
  const updateMessageHandler = (newMessage: FullMessageType) => {
    // Update the message in the state
    setMessages((currentMessages) => currentMessages.map((message) => {
      // Replace the message if its ID matches the new message's ID
      if (message.id === newMessage.id) {
        return newMessage;
      }

      // Otherwise, return the message as is
      return message;
    }));
  };

  // Render the component
  return ( 
    <div className="flex-1 overflow-y-auto">
      {/* Loop over the messages and display each one */}
      {messages.map((message, i) => (
        <MessageBox 
          isLast={i === messages.length - 1} 
          key={message.id} 
          data={message}
        />
      ))}
      {/* Reference to the bottom of the message list */}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
}
 
export default Body;
