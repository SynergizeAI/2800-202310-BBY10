"use client";

import { User } from "@prisma/client";

import Image from "next/image";
import useActiveList from "../hooks/useActiveList";
import {
  UserAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface AvatarProps {
  user: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  return (
    <div className='relative'>
      <UserAvatar>
        <AvatarImage src={user?.image || undefined} />
        <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
      </UserAvatar>
      {/* <div className='relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11'>
        <Image
          fill
          src={user?.image || "/images/placeholder.png"}
          alt='Avatar'
          className='rounded-full'
        />
      </div> */}
      {isActive && (
        <span className='absolute block ring-white top-0 right-0h-2 w-2 md:h-3 md:w-3' />
      )}
    </div>
  );
};

export default Avatar;
