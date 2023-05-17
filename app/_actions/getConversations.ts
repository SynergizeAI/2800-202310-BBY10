import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

/**
 * returns all the conversations of the current user.
 *
 * - retrieves the current user and fetches all the conversations the user is part of.
 * - conversations are ordered by the time of the last message in descending order.
 * - returns an empty array if there is an error or if there is no current user.
 *
 * @returns {array} conversations - An array of conversation objects.
 */

const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  try {
    // Get all conversations of the current user from the database
    const conversations = await prisma.conversation.findMany({
      // Order the by the time of the last message in descending order
      orderBy: {
        lastMessageAt: "desc",
      },
      // Filter the conversations to only include the ones where current user is part of
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      // Include the users and messages in the returned conversation objects
      include: {
        users: true,
        messages: {
          // Include the sender and seen objects
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    return conversations;
  } catch (error: any) {
    console.log(error, "GET_CONVERSATIONS_ERROR");
    return [];
  }
};

export default getConversations;
