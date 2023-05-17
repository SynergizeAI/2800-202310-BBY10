import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from ".prisma/client";

/**
 * returns the other user in a conversation.
 *
 * filters the users in a conversation and returns the user that is not the current user.
 *
 * @param {object} conversation - The conversation object containing an array of users.
 * @returns {object} otherUser - The other user in the conversation.
 */

const useOtherUser = (
  conversation: FullConversationType | { users: User[] }
) => {
  const session = useSession();

  // Recalculate when the users in the conversation or the current user's email changes
  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    // Filter the users in the conversation to get the other user
    const otherUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );

    // Return the other user (assumes there is always only one other user in the conversation)
    return otherUser[0];
  }, [conversation.users, session?.data?.user?.email]);

  return otherUser;
};

export default useOtherUser;
