/**
 * Get the current user from the session
 * @returns {Promise<User | null>} The current user or null if there is no user
 */

import prisma from "@/app/libs/prismadb";

import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    // if there is no session or no user in the session
    if (!session?.user?.email) {
      return null;
    }

    // use prisma to query if there is a user with the email
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
