import { NextResponse } from "next/server";
import getCurrentUser from "@/app/_actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  conversationId?: string;
}

/**
 * Handles a POST request to mark a conversation as seen by the current user.
 *
 * @param {Request} request - The HTTP request.
 * @param {Object} params - The parameters including conversationId.
 * @returns {Promise<NextResponse>} The response to send back to the client.
 */
export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    // Get current user
    const currentUser = await getCurrentUser();
    //Destructuring assignment
    const { conversationId } = params;

    // Validate if the user's id or email is not available
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Find the conversation by its ID, including messages and users
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: { include: { seen: true } },
        users: true,
      },
    });

    // Check if conversation exists
    if (!conversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    // Get the last message in the conversation
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    // If there is no last message, return the conversation
    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    // If the user has already seen the message, return the conversation
    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation);
    }

    // Update the 'seen' status of the last message
    const updatedMessage = await prisma.message.update({
      where: { id: lastMessage.id },
      include: { sender: true, seen: true },
      data: { seen: { connect: { id: currentUser.id } } },
    });

    return new NextResponse('Success');

  } catch (error) {
    console.log('An error occurred when updating message seen status: ', error);
    return new NextResponse('Error', { status: 500 });
  }
}
