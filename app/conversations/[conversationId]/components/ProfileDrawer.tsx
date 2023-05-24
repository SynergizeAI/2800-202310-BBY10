/**
 * ProfileDrawer.tsx
 * This component renders a profile drawer for a conversation in a chat application.
 * It displays information such as participants' avatars, emails, and joined date.
 * It also includes a delete option that triggers a confirmation modal.
 */

// Import necessary libraries and components
import React, { Fragment, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose, IoTrash } from "react-icons/io5";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";

import useOtherUser from "@/app/hooks/useOtherUser";
import useActiveList from "@/app/hooks/useActiveList";

import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import ConfirmModal from "./ConfirmModal";

// Define the component props
interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}

// Define the ProfileDrawer component
const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  // Use custom hooks to get other users in the conversation and active members
  const [confirmOpen, setConfirmOpen] = useState(false);
  const otherUser = useOtherUser(data);

  // Compute joined date and title for the drawer
  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  // Compute the status text based on conversation type and active status
  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [data, isActive]);

  // Render the profile drawer component
  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-500'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed' />
          </Transition.Child>

          <div className='fixed overflow-hidden '>
            <div className='absolute overflow-hidden'>
              <div className='fixed inset-y-0 right-0 flex max-w-full pl-10 '>
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'>
                  <Dialog.Panel className='pointer-events-auto border-l border-solid border-black max-w-md'>
                    <div className='flex h-full flex-col overflow-y-scroll py-6 bg-white'>
                      <div className='px-4 sm:px-6'>
                        {/* Render close button */}
                        <div className='flex items-start justify-end'>
                          <div className='ml-3 flex h-7 items-center'>
                            <button
                              type='button'
                              className=' text-gray-400 hover:text-gray-500 focus:ring-indigo-500'
                              onClick={onClose}>
                              <span className='sr-only'>Close panel</span>
                              <IoClose size={24} aria-hidden='true' />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                        {/* Render profile information */}
                        <div className='flex flex-col items-center'>
                          <div className='mb-2'>
                            {data.isGroup ? (
                              <AvatarGroup users={data.users} />
                            ) : (
                              <Avatar user={otherUser} />
                            )}
                          </div>
                          <div>{title}</div>
                          <div className='text-sm'>{statusText}</div>
                          {/* Render delete button */}
                          <div className='flex gap-10 my-8'>
                            <div
                              onClick={() => setConfirmOpen(true)}
                              className='flex flex-col gap-3 items-center'>
                              <div className='w-10 h-10 flex items-center justify-center'>
                                <IoTrash size={20} />
                              </div>
                              <div className=''>Delete</div>
                            </div>
                          </div>
                          {/* Render additional information */}
                          <div className='w-full pb-5 pt-5 sm:px-0 sm:pt-0'>
                            <dl className='space-y-8 px-4 sm:px-6'>
                              {data.isGroup && (
                                <div>
                                  <dt className='text-sm text-gray-500 sm:w-40'>
                                    Emails
                                  </dt>
                                  <dd className='mt-1 text-sm sm:col-span-2'>
                                    {data.users.map((user, index) => (
                                      <React.Fragment key={user.email}>
                                        {user.email}
                                        {index !== data.users.length - 1 && (
                                          <br />
                                        )}
                                      </React.Fragment>
                                    ))}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <div>
                                  <dt className='text-sm sm:w-40 sm:flex-shrink-0'>
                                    Email
                                  </dt>
                                  <dd className='mt-1 sm:col-span-2'>
                                    {otherUser.email}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <>
                                  <hr />
                                  <div>
                                    <dt className=' text-sm  sm:w-40 sm:flex-shrink-0 '>
                                      Joined
                                    </dt>
                                    <dd className=' mt-1 text-sm sm:col-span-2 '>
                                      <time dateTime={joinedDate}>
                                        {joinedDate}
                                      </time>
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

// Export the component
export default ProfileDrawer;
