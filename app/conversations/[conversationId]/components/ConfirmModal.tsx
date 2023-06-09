/**
 * @file This file contains the ConfirmModal component, which is used to confirm if the user wants to delete a conversation.
 */
"use client";

import React, { useCallback, useState } from "react";
import { Dialog } from "@headlessui/react";
import { FiAlertTriangle } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/navigation";
import Modal from "@/app/components/Modal";
import { Button } from "@/app/button";
import useConversation from "@/app/hooks/useConversation";
import { toast } from "react-hot-toast";

// Define the properties of the ConfirmModal component
interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

/**
 * The ConfirmModal component displays a confirmation dialog when a user tries to delete a conversation.
 *
 * @param {object} props - The properties for the component.
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {() => void} props.onClose - A function to close the modal.
 * @returns {JSX.Element} The rendered component.
 */
const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle the deletion of the conversation
  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  }, [router, conversationId, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='sm:flex sm:items-start'>
        <div
          className='
              mx-auto 
              flex 
              h-12 
              w-12 
              flex-shrink-0 
              items-center 
              justify-center 
            '>
          {/* Alert icon */}
          <FiAlertTriangle className='' aria-hidden='true' />
        </div>
        <div
          className='
              mt-3 
              text-center 
              sm:ml-4 
              sm:mt-0 
              sm:text-left
            '>
          {/* Modal title */}
          <Dialog.Title as='h3' className='text-base leading-6'>
            Delete conversation
          </Dialog.Title>
          {/* Modal description */}
          <div className='mt-2'>
            <p className='text-sm text-gray-500'>
              Are you sure you want to delete this conversation? This action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      {/* Action buttons */}
      <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
        <Button
          disabled={isLoading}
          onClick={onDelete}
          variant='destructive'>
          Delete
        </Button>
        <Button
          disabled={isLoading}
          onClick={onClose}
          variant='outline'>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
