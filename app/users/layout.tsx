/**
 * Renders the users page layout
 * Includes the sidebar and the users page
 */

import Sidebar from "../components/sidebar/Sidebar";

async function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    //Can't use <Sidebar> because it's async.
    //Temp fix until typescript fixes this
    //@ts-expect-error Server Component
    <Sidebar>
      <div className='h-full'>{children}</div>
    </Sidebar>
  );
}

export default UsersLayout;
