"use client";

/**
 * represents an individual item in the list of conversations.
 *
 * displays a conversation item with the following details:
 * - Avatar of the other user in the conversation
 * - The conversation name (or the other user's name if no conversation name is set)
 * - The creation time of the last message (if available)
 * - The text of the last message (or a default string if no last message is available)
 *
 * @param {object} props.data - The data object containing information about the conversation.
 * @param {boolean} props.selected - A boolean that represents whether the conversation item is currently selected.
 */

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  // callback for handling a click event which navigates to the conversation route
  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  // get the last message of the conversation
  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  // get the email of the current user
  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  // checks whether the last message has been seen by the current user
  const hasSeen = useMemo(() => {
    if (!lastMessage || !userEmail) return false;

    const seen = lastMessage.seen || [];
    return seen.some((user) => user.email === userEmail);
  }, [lastMessage, userEmail]);

  // text to display for the last message
  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  // route to the conversation page when the conversation box is clicked
  return (
    <div
      onClick={handleClick}
      className={clsx(
        "w-full relative flex items-center space-x-3 p-1 hover:bg-slate-100 cursor-pointer mb-3"
      )}>
      {/* Display the avatar of the other user */}
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
          <div className='flex justify-between items-center mb-1'>
            {/* Display the conversation name or the other user's name if no conversation name is set */}
            <p className='truncate font-medium'>
              {data.name || otherUser.name}
            </p>

            {lastMessage?.createdAt && (
              <p className='font-light text-sm'>
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>

          {/* display the last message */}
          <p className={clsx("truncate font-light text-sm")}>
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
