'use client';

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarGroupProps {
  users?: User[];
};

/**
 * AvatarGroup component displays a group of avatars.
 * @param {AvatarGroupProps} props - The props object containing users.
 * @returns {JSX.Element} The AvatarGroup component.
 */
const AvatarGroup: React.FC<AvatarGroupProps> = ({ 
  users = [] 
}) => {
      // Slice the array to get the first three users
  const slicedUsers = users.slice(0, 3);
  
    // Map positions for the avatars
  const positionMap = {
    0: 'top-0 left-[12px]',
    1: 'bottom-0',
    2: 'bottom-0 right-0'
  }

  return (
    <div className="relative h-11 w-11">
      {slicedUsers.map((user, index) => (
        <div 
          key={user.id} 
          className={`
            absolute
            inline-block 
            rounded-full 
            overflow-hidden
            h-[21px]
            w-[21px]
            ${positionMap[index as keyof typeof positionMap]}
          `}>
            <Image
              fill
              src={user?.image || '/images/placeholder.jpg'}
              alt="Avatar"
            />
        </div>
      ))}
    </div>
  );
}

export default AvatarGroup;