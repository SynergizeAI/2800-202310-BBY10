import { NextResponse } from "next/server";
import getCurrentUser from "@/app/_actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import { upsert } from "./_utils/upsert";
import { query } from "./_utils/query";
import { prompt } from "./_utils/prompt";

/**
 * Handles a POST request to create a new message in a conversation.
 *
 * @param {Request} request - The HTTP request.
 * @returns {Promise<NextResponse>} The response to send back to the client.
 */
export async function POST(request: Request) {
  try {
    // Get current user
    const currentUser = await getCurrentUser();

    // Parse the request body
    const body = await request.json();
    const { message, image, conversationId } = body;

    // Validate if the user's id or email is not available
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Create a new message, including seen and sender
    const newMessage = await prisma.message.create({
      include: { seen: true, sender: true },
      data: {
        body: message,
        image: image,
        conversation: { connect: { id: conversationId } },
        sender: { connect: { id: currentUser.id } },
        seen: { connect: { id: currentUser.id } },
      },
    });

    // Update the conversation with the new message and the last message timestamp
    const updatedConversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageAt: new Date(),
        messages: { connect: { id: newMessage.id } },
      },
      include: {
        users: true,
        messages: { include: { seen: true } },
      },
    });
    // console.log(newMessage);

    await pusherServer.trigger(conversationId, "messages:new", newMessage);

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, "conversation:update", {
        id: conversationId,
        messages: [lastMessage],
      });
    });

    let botResponsePromise;
    if (message.startsWith("@flo")) {
      // remove first word
      const command = message.split(" ").slice(1).join(" ");
      // console.log("command", command);

      // Send a "bot:typing" event to the front end
      pusherServer.trigger(conversationId, "bot:typing", { isTyping: true });

      // Start generating the bot response, but don't wait for it to finish
      botResponsePromise = generateBotResponse(
        command,
        conversationId,
        currentUser
      );
    }

    // No need to get the last message here as we just created it
    // Return the new message as response
    const response = NextResponse.json(newMessage);

    await upsert(message, newMessage.id, conversationId, currentUser.name);

    // If a bot response is being generated, wait for it to finish
    if (botResponsePromise) {
      await botResponsePromise;
    }

    return response;
  } catch (error) {
    console.log("An error occurred when posting a new message: ", error);
    return new NextResponse("Error", { status: 500 });
  }
}

async function generateBotResponse(
  command: string,
  conversationId: string,
  currentUser: any
) {
  // if the only word is cat, send a cat image
  let botResponse;
  let image = null;
  if (command === "cat") {
    const cat = await fetch("https://cataas.com/cat/gif?json=true");
    const catJson = await cat.json();
    const catUrl = catJson.url;
    image = `https://cataas.com/${catUrl}`;
    botResponse = "Here is a cat!";
  } else {
    const matches = await query(command, conversationId);
    // console.log("context", matches);

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        users: { select: { name: true } },
        messages: {
          select: {
            body: true,
            createdAt: true,
            sender: { select: { name: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });

    const name = conversation?.name;
    const users = conversation?.users.map((user) => user.name);

    const conversation_log = conversation?.messages.map((message) => {
      const { body, createdAt, sender } = message;
      return { timestamp: createdAt, sender: sender.name, text: body };
    });

    const context = matches?.map((match) => match.metadata);

    const context_log = context?.map((log: any) => {
      const { sender, text, timestamp } = log;
      return { timestamp, sender, text };
    });

    const props = {
      users,
      name,
      context_log,
      conversation_log,
      command,
    };

    botResponse = await prompt(props);
  }
  pusherServer.trigger(conversationId, "bot:typing", { isTyping: false });

  // Create a new message from the bot
  const botMessage = await prisma.message.create({
    include: { seen: true, sender: true },
    data: {
      body: botResponse,
      image: image,
      conversation: { connect: { id: conversationId } },
      sender: { connect: { id: "64648a2b0a9a533e1373b18e" } },
      seen: { connect: { id: currentUser.id } },
    },
  });

  // Update the conversation with the new message and the last message timestamp
  const botUpdatedConversation = await prisma.conversation.update({
    where: { id: conversationId },
    data: {
      lastMessageAt: new Date(),
      messages: { connect: { id: botMessage.id } },
    },
    include: {
      users: true,
      messages: { include: { seen: true } },
    },
  });

  // Trigger an update to the conversation with the bot's new message
  await pusherServer.trigger(conversationId, "messages:new", botMessage);

  // Notify all users of the conversation update
  botUpdatedConversation.users.map((user) => {
    pusherServer.trigger(user.email!, "conversation:update", {
      id: conversationId,
      messages: [botMessage],
    });
  });

  return botMessage;
}
