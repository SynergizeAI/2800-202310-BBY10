/**
 * @EmptyState is used to display a message when there are no chats to display
 * It is used in the users/page.tsx component
 */

const EmptyState = () => {
  return (
    <div className='px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center'>
      <div className='text-center items-center flex-col'>
        <h3 className='mt-2'>
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
