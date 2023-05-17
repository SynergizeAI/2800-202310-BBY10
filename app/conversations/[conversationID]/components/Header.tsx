/**
 * Header.tsx
 * This component renders the header for a conversation in a chat application.
 * It displays information such as the conversation name, participants,
 * and their active status. It also includes a profile drawer for more details.
 */

// Import necessary libraries and components
import { HiChevronLeft } from 'react-icons/hi';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Conversation, User } from '@prisma/client';

import useOtherUser from '@/app/hooks/useOtherUser';
import useActiveList from '@/app/hooks/useActiveList';

import Avatar from '@/app/components/Avatar';
import AvatarGroup from '@/app/components/AvatarGroup';
import ProfileDrawer from './ProfileDrawer';

// Define the component props
interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

// Define the Header component
const Header: React.FC<HeaderProps> = ({ conversation }) => {
  // Use custom hooks to get other users in the conversation and active members
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  // Compute the status text based on conversation type and active status
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? 'Active' : 'Offline';
  }, [conversation, isActive]);

  // Render the header component
  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
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
          {/* Render back arrow for smaller screens */}
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
          {/* Render either AvatarGroup or single Avatar depending on conversation type */}
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          {/* Render conversation name and status text */}
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        {/* Render ellipsis icon to open ProfileDrawer */}
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
};

// Export the Header component
export default Header;
