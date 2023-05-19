// client-side scripting
"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";

import useConversation from "@/app/hooks/useConversation";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
import clsx from "clsx";

/**
 * Component for displaying the body of a conversation.
 *
 * @param {Object[]} initialMessages - The initial list of messages to display.
 * @returns {React.FC} The React component.
 */
const Body: React.FC<{ initialMessages: FullMessageType[] }> = ({
  initialMessages = [],
}) => {
  // Reference to the bottom of the message list
  const bottomRef = useRef<HTMLDivElement>(null);

  // State for the list of messages
  const [messages, setMessages] = useState(initialMessages);

  const [botIsTyping, setBotIsTyping] = useState(false);

  // Get the conversation ID from the conversation context
  const { conversationId } = useConversation();

  // Effect to mark the conversation as seen whenever the conversation ID changes
  useEffect(() => {
    // Post a request to mark the conversation as seen
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    // Handler for new messages
    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      // @current the current list of messages
      setMessages((current) => {
        // check if the message is already in the list
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      // Update the message in the state
      setMessages((currentMessages) =>
        currentMessages.map((message) => {
          // Replace the message if its ID matches the new message's ID
          if (message.id === newMessage.id) {
            return newMessage;
          }

          // Otherwise, return the message as is
          return message;
        })
      );
    };

    const botTypingHandler = (data: { isTyping: boolean }) => {
      // Use the "isTyping" property to trigger the typing animation
      setBotIsTyping(data.isTyping);
      // console.log("bot is typing", data.isTyping);
    };

    pusherClient.bind("bot:typing", botTypingHandler);
    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("messages:update", updateMessageHandler);

    // unmount
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("bot:typing", botTypingHandler);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("messages:update", updateMessageHandler);
    };
  }, [conversationId]);

  // Effect to scroll to the bottom of the message list whenever a new message is added
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages]);

  // Render the component
  return (
    <div className='flex-1 overflow-y-auto'>
      {/* Loop over the messages and display each one */}
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
          ref={i === messages.length - 1 ? bottomRef : null}
        />
      ))}
      <div className={clsx(botIsTyping ? "visible" : "invisible")}>
        <div className='text-gray-500 pl-2 pb-2'>flo is typing...</div>
      </div>
    </div>
  );
};

export default Body;
