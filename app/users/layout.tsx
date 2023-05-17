/**
 * Renders the users page layout
 * Includes the sidebar and the users page
 */

import Sidebar from "../components/sidebar/Sidebar";
import getUsers from "../_actions/getUsers";
import UserList from "./components/UserList";

async function UsersLayout({ children }: { children: React.ReactNode }) {
  const users = await getUsers();
  return (
    //Can't use <Sidebar> because it's async.
    //Temp fix until typescript fixes this
    //@ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <UserList users={users} />
        <div className='h-full'>{children}</div>
      </div>
    </Sidebar>
  );
}

export default UsersLayout;
