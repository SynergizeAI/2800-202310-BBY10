import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

/**
 * Retrieves a conversation by its ID.
 *
 * @param {string} conversationId - The ID of the conversation to retrieve.
 * @returns {Promise<Object|null>} The conversation if found, null otherwise.
 */
const getConversationById = async (conversationId: string) => {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();

    /* 
     * Validation: Check if the current user or their email is not available
     * If not available, we return null 
     */
    if (!currentUser || !currentUser.email) {
      console.log('Current user or their email is not available.');
      return null;
    }

    /* 
     * Find the conversation by its ID and include the users
     * Here we use the Prisma client to fetch data from our database
     */
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { users: true },
    });

    return conversation;

  } catch (error) {
    console.log('A server error occurred: ', error);
    return null;
  }
};

export default getConversationById;
