import { NextResponse } from "next/server";
import getCurrentUser from "@/app/_actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

/**
 * Handles a POST request to create a new message in a conversation.
 *
 * @param {Request} request - The HTTP request.
 * @returns {Promise<NextResponse>} The response to send back to the client.
 */
export async function POST(request: Request,) {
  try {
    // Get current user
    const currentUser = await getCurrentUser();

    // Parse the request body
    const body = await request.json();
    const { message, image, conversationId } = body;

    // Validate if the user's id or email is not available
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
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
      }
    });

    // Update the conversation with the new message and the last message timestamp
    const updatedConversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageAt: new Date(),
        messages: { connect: { id: newMessage.id } }
      },
      include: {
        users: true,
        messages: { include: { seen: true } },
      }
    });

    // No need to get the last message here as we just created it
    // Return the new message as response
    return NextResponse.json(newMessage);

  } catch (error) {
    console.log('An error occurred when posting a new message: ', error);
    return new NextResponse('Error', { status: 500 });
  }
}
