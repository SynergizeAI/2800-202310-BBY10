/**
 * Retrieves messages for a given conversation ID.
 * @param {string} conversationId - The ID of the conversation.
 * @returns {object[]} - An array of message objects for the conversation.
 */

import prisma from "@/app/libs/prismadb";

const getMessages = async (
  conversationId: string
) => {
  try {
    // Retrieve messages for the conversation ID
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return messages;
  } catch (error: any) {
    return [];
  }
};

export default getMessages;