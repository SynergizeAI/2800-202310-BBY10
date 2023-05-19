"use client";

/**
 * Renders the users list in the sidebar
 * @param users - The users to render
 */

import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <aside className='fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r block w-full left-0 bg-slate-50'>
      <div className='px-5 p-4'>
        <div className='flex-col'>
          <div className='pb-4 text-lg font-semibold'>Users</div>
        </div>
        {users.map((user) => (
          <UserBox key={user.id} data={user} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
