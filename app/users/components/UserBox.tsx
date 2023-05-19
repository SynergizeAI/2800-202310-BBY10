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
import LoadingModal from "@/app/components/LoadingModal";

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
    <>
    {isLoading && (
        <LoadingModal />
      )}
    <div
      onClick={handleClick}
      className='w-full relative flex items-center cursor-pointer'>
      <Avatar user={data} />
      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
          <div className='flex justify-between items-center mb-1'>
            <p className='truncate'>
              {data.name}
            </p>
          </div>
        </div>
      </div>
    </div>
        </>
  );
};

export default UserBox;
