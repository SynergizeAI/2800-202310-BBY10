import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getAblyRealtime from "../../utils/ably";
import SendMessageForm from "./SendMessageForm";

function ChatSpace() {
  const { id: chatSpaceId } = useParams();
  const [messages, setMessages] = useState([]);
  const [isUserMember, setIsUserMember] = useState(null);
  const [users, setUsers] = useState({});
  const [code, setCode] = useState("");

  useEffect(() => {
    (async function validateAndJoinChat() {
      const response = await fetch(
        `/api/spaces/validate-membership?chatSpaceId=${chatSpaceId}`,
        {
          credentials: "include", // to send cookies with the request
        }
      );

      if (response.ok) {
        setIsUserMember(true);
        const realtime = await getAblyRealtime(chatSpaceId);
        const channel = realtime.channels.get(`private-${chatSpaceId}`);

        channel.subscribe("message", (message) => {
          setMessages((prevMessages) => [...prevMessages, message.data]);
        });

        // Fetch initial user details from the server for the members of the chat space
        await fetchAndSetUsers();

        // Listen for presence events
        channel.presence.subscribe('enter', async (member) => {
          // Fetch updated user details when a new user joins
          await fetchAndSetUsers();
        });

        // Enter this user into this channel
        channel.presence.enter();

        await channel.attach();

        // Fetch message history from the server
        const historyResponse = await fetch(`https://zany-ruby-deer-kit.cyclic.app/api/messages/${chatSpaceId}`, {
          credentials: "include", // to send cookies with the request
        });
        if (historyResponse.ok) {
          const historyData = await historyResponse.json();
          setMessages(historyData);
        }
      } else {
        setIsUserMember(false);
      }
    })();
  }, [chatSpaceId]);

  // Function to fetch and update user details
  const fetchAndSetUsers = async () => {
    try {
      const chatSpaceResponse = await fetch(`https://zany-ruby-deer-kit.cyclic.app/api/spaces/${chatSpaceId}`);
      if (chatSpaceResponse.ok) {
        const chatSpaceData = await chatSpaceResponse.json();
        setCode(chatSpaceData.code);
        const members = chatSpaceData.members;
        const usersMap = {};
        members.forEach((member) => {
          usersMap[member.userId] = member.name;
        });
        setUsers(usersMap);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isUserMember === null) {
    return <div>Loading...</div>;
  }

  if (!isUserMember) {
    return <div>You are not a member of this chat space.</div>;
  }

  return (
    <div>
      <h1>Chat Space {chatSpaceId}</h1>
      <h2>Join Code: {code}</h2>
      {messages.map((message, index) => (
        <div key={index}>
          <strong>{users[message.user]}:</strong> {message.text}
        </div>
      ))}
      <SendMessageForm chatSpaceId={chatSpaceId} />
    </div>
  );
}

export default ChatSpace;
