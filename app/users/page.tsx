/**
 * @Users is used to render the users page
 * @EmptyState is used to display a message when there are no chats to display
 * It is used for large screens only
 * Hidden on small screens
 */

import EmptyState from "../components/EmptyState";

const Users = () => {
  return (
    <div className='hidden lg:block lg:pl-80 h-full'>
      <EmptyState />
    </div>
  );
};

export default Users;
