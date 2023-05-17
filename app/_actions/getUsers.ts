/**
 * Get all users except the current user
 * @returns {Promise<User[]>} All users except the current user
 */

import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getUser = async () => {
  const session = await getSession();
  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });
    return users;
  } catch (error: any) {
    console.log(error, "GET_USERS_ERROR");
    return [];
  }
};

export default getUser;
