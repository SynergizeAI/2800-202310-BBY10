// client-side scripting
'use client';

import clsx from "clsx"; // utility for constructing className strings conditionally
import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns"; // library for manipulating JS dates
import { useSession } from "next-auth/react";
import Avatar from "@/app/components/Avatar";

// Import FullMessageType from types
import { FullMessageType } from "@/app/types";

/**
 * MessageBox component that shows a message in a conversation.
 * 
 * @param {Object} props - Component properties.
 * @param {FullMessageType} props.data - Message object.
 * @param {boolean} props.isLast - Flag indicating if the message is the last one in the conversation.
 * @returns {React.FC} The MessageBox component.
 */
const MessageBox: React.FC<{data: FullMessageType, isLast?: boolean}> = ({ 
  data, 
  isLast
}) => {
  // Get current user's session
  const session = useSession();

  // State for controlling the opening and closing of the image modal
  const [imageModalOpen, setImageModalOpen] = useState(false);

  // Check if the current user is the sender of the message
  const isOwn = session.data?.user?.email === data?.sender?.email

  // Construct a list of users who have seen the message, excluding the sender
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(', ');

  // Construct class names conditionally using clsx
  const container = clsx('flex gap-3 p-4', isOwn && 'justify-end');
  const avatar = clsx(isOwn && 'order-2');
  const body = clsx('flex flex-col gap-2', isOwn && 'items-end');
  const message = clsx(
    'text-sm w-fit overflow-hidden', 
    isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100', 
    data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
  );

  // Render the component
  return ( 
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            {data.sender.name}
          </div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
        <div className={message}>
          {data.image ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              onClick={() => setImageModalOpen(true)} 
              src={data.image} 
              className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div 
            className="
            text-xs 
            font-light 
            text-gray-500
            "
          >
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
   );
}
 
export default MessageBox;
