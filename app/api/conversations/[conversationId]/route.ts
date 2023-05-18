/**
 * @file This file contains the DELETE function, which is used to delete a conversation by its ID.
 */

import getCurrentUser from "@/app/_actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

// Define the properties of the IParams interface
interface IParams {
  conversationId?: string;
}

/**
 * The DELETE function handles the deletion of a conversation by its ID.
 *
 * @async
 * @param {Request} request - The request object.
 * @param {object} paramsContext - The object containing the parameters.
 * @param {IParams} paramsContext.params - The parameters with conversationId.
 * @returns {Promise<NextResponse>} The NextResponse with the deleted conversation or an error message.
 */
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json(null);
    }

    // Find the existing conversation
    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true
      }
    });

    if (!existingConversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    // Delete the conversation
    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id]
        },
      },
    });

    return NextResponse.json(deletedConversation)
  } catch (error: any) {
    console.log(error, 'ERROR_CONVERSATION_DELETE');
    return new NextResponse('Internal Error', { status:500 });
  }
}
