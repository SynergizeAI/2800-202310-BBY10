// client-side scripting
"use client";

import clsx from "clsx"; // utility for constructing className strings conditionally
import Image from "next/image";
import React, { useState, forwardRef } from "react";
import { format } from "date-fns"; // library for manipulating JS dates
import { useSession } from "next-auth/react";
import Avatar from "@/app/components/Avatar";
import ImageModal from "./ImageModal";

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

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox = React.forwardRef<HTMLDivElement, MessageBoxProps>(
  ({ data, isLast }, ref) => {
    MessageBox.displayName = 'MessageBox';
    // Get current user's session
    const session = useSession();

    // State for controlling the opening and closing of the image modal
    const [imageModalOpen, setImageModalOpen] = useState(false);

    // Check if the current user is the sender of the message
    const isOwn = session.data?.user?.email === data?.sender?.email;

    // Construct a list of users who have seen the message, excluding the sender
    const seenList = (data.seen || [])
      .filter((user) => user.email !== data?.sender?.email)
      .map((user) => user.name)
      .join(", ");

    // Construct class names conditionally using clsx
    const container = clsx("flex gap-3 pl-4 py-2");
    const body = clsx("flex flex-col");
    const message = clsx(
      "text-base w-fit overflow-hidden whitespace-pre-line",
      data.image && "rounded-md p-0"
    );

    // Render the component
    return (
      <div ref={ref} className={container}>
        <div className='mt-1'>
          <Avatar user={data.sender} />
        </div>
        <div className={body}>
          <div className='flex items-center gap-1'>
            <div className='font-medium text-base'>
              {data?.sender?.name || "Loading..."}
            </div>
            <div className='text-xs text-gray-400'>
              {format(new Date(data.createdAt), "p")}
            </div>
          </div>
          <div className={message}>
            <ImageModal
              src={data.image}
              isOpen={imageModalOpen}
              onClose={() => setImageModalOpen(false)}
            />
            {data.image ? (
              <Image
                alt='Image'
                height='288'
                width='288'
                onClick={() => setImageModalOpen(true)}
                src={data.image}
                className='
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              '
              />
            ) : (
              <div>{data.body}</div>
            )}
          </div>
          {isLast && isOwn && seenList.length > 0 && (
            <div
              className='
            text-xs 
            font-light 
            text-gray-500
            '>
              {`Seen by ${seenList}`}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default MessageBox;
