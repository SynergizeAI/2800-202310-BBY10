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
        "w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer",
        selected ? "bg-neutral-100" : "bg-white"
      )}>
      {/* Display the avatar of the other user */}
      <Avatar user={otherUser} />

      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
          <div className='flex justify-between items-center mb-1'>
            {/* Display the conversation name or the other user's name if no conversation name is set */}
            <p className='text-sm font-medium text-neutral-900 truncate'>
              {data.name || otherUser.name}
            </p>

            {/* display its creation time if there is a last message, */}
            {lastMessage?.createdAt && (
              <p className='text-xs text-gray-400 font-light'>
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>

          {/* display the last message */}
          <p
            className={clsx(
              "truncate text-sm",
              hasSeen ? "text-gray-500" : "text-black font-medium"
            )}>
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
