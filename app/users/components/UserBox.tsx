"use client";

/**
 * Renders a user in the users list
 * @param data - The user data
 */

import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { useCallback, useState } from "react";
import axios from "axios";
import Avatar from "@/app/components/Avatar";

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", { userId: data.id })
      .then((res) => {
        router.push(`/conversations/${res.data.id}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [data, router]);

  return (
    <div
      onClick={handleClick}
      className='w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer'>
      <Avatar user={data} />
      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
          <div className='flex justify-between items-center mb-1'>
            <p className='text-sm font-medium text-neutral-900 truncate'>
              {data.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
