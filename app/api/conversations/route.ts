/**
 * Handles POST requests for creating a new conversation.
 *
 * @param {Request} request - The incoming request object from the client.
 * @returns {Response} Returns a new conversation object or an error.
 */

import getCurrentUser from "@/app/_actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

type Member = { value: string };
type User = { id: string };

// Formats the members array and adds the current user to it.
const formatMembers = (members: Member[], currentUser: User) => {
  const formattedMembers = members.map((member) => ({ id: member.value }));
  formattedMembers.push({ id: currentUser.id });
  return formattedMembers;
};

// Creates a new group conversation in the database.
const createGroupConversation = async (
  name: string,
  isGroup: boolean,
  members: Member[],
  currentUser: User
) => {
  const conversationData = {
    name,
    isGroup,
    users: {
      connect: formatMembers(members, currentUser),
    },
  };

  return await prisma.conversation.create({
    data: conversationData,
    include: {
      users: true,
    },
  });
};

// Creates a new single conversation in the database.
const createSingleConversation = async (userId: string, currentUser: User) => {
  const conversationData = {
    users: {
      connect: [
        {
          id: currentUser.id,
        },
        {
          id: userId,
        },
      ],
    },
  };

  return await prisma.conversation.create({
    data: conversationData,
    include: {
      users: true,
    },
  });
};

// Fetches all conversations between two users from the database.
const findConversations = async (currentUser: User, userId: string) => {
  return await prisma.conversation.findMany({
    where: {
      OR: [
        {
          userIds: {
            equals: [currentUser.id, userId],
          },
        },
        {
          userIds: {
            equals: [userId, currentUser.id],
          },
        },
      ],
    },
  });
};

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.email || !currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid group", { status: 400 });
    }

    if (isGroup) {
      const newConversation = await createGroupConversation(
        name,
        isGroup,
        members,
        currentUser
      );

      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, "conversation:new", newConversation);
        }
      });

      return NextResponse.json(newConversation);
    }

    const existingConversations = await findConversations(currentUser, userId);
    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await createSingleConversation(userId, currentUser);

    newConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:new", newConversation);
      }
    });

    return NextResponse.json(newConversation);
  } catch (error: any) {
    console.log(error, "GET_USERS_ERROR");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
