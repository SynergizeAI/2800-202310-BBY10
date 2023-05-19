// client-side scripting
"use client";

import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { useMemo, useState } from "react";
import Link from "next/link";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";

// Import Conversation and User types from Prisma client
import { Conversation, User } from "@prisma/client";
import ProfileDrawer from "./ProfileDrawer";
import useActiveList from "@/app/hooks/useActiveList";

/**
 * Header component for displaying conversation details.
 *
 * @param {Object} props - Component properties.
 * @param {Conversation & {users: User[]}} props.conversation - Conversation object including array of users.
 * @returns {React.FC} The header component.
 */
const Header: React.FC<{ conversation: Conversation & { users: User[] } }> = ({
  conversation,
}) => {
  // Get the other user in the conversation
  const otherUser = useOtherUser(conversation);

  // State for controlling the opening and closing of the drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);

  // Render the component
  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className=' w-full  flex  border-b-[1px]  sm:px-4  py-3  px-4  lg:px-6  justify-between  items-center'>
        <div className='flex gap-3 items-center'>
          <Link
            href='/conversations'
            className='lg:hidden  block'>
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className='flex flex-col'>
            <div>{conversation.name || otherUser.name}</div>
            <div className=''>
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className=''
        />
      </div>
    </>
  );
};

export default Header;
