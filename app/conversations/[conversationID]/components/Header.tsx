// client-side scripting
'use client';

import { HiChevronLeft} from 'react-icons/hi';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { useState } from "react";
import Link from "next/link";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";

// Import Conversation and User types from Prisma client
import { Conversation, User } from "@prisma/client";

/**
 * Header component for displaying conversation details.
 * 
 * @param {Object} props - Component properties.
 * @param {Conversation & {users: User[]}} props.conversation - Conversation object including array of users.
 * @returns {React.FC} The header component.
 */
const Header: React.FC<{conversation: Conversation & {users: User[]}}> = ({ conversation }) => {
  // Get the other user in the conversation
  const otherUser = useOtherUser(conversation);

  // State for controlling the opening and closing of the drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Render the component
  return (
    <>
      <div 
        className="
          bg-white 
          w-full 
          flex 
          border-b-[1px] 
          sm:px-4 
          py-3 
          px-4 
          lg:px-6 
          justify-between 
          items-center 
          shadow-sm
        "
      >
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations" 
            className="
              lg:hidden 
              block 
              text-sky-500 
              hover:text-sky-600 
              transition 
              cursor-pointer
            "
          >
            <HiChevronLeft size={32} />
          </Link>
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="
            text-sky-500
            cursor-pointer
            hover:text-sky-600
            transition
          "
        />
      </div>
    </>
  );
}
 
export default Header;
