"use client";

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * Modal component renders a modal dialog.
 * @param {ModalProps} props - The props object containing isOpen, onClose, and children.
 * @returns {JSX.Element} The Modal component.
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div
            className='
              fixed 
              inset-0
            '
          />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto '>
          <div
            className='
              flex 
              min-h-full 
              items-center 
              justify-center 
              text-center 
              sm:p-0
              
            '>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <Dialog.Panel
                className='
                bg-white
                border
                border-black
                  relative 
                  transform 
                  overflow-hidden
                  px-4 
                  pb-4
                  pt-5 
                  text-left 
                  w-full
                  sm:my-8 
                  sm:w-full 
                  sm:max-w-lg 
                  sm:p-6
                '>
                <div
                  className='
                    absolute 
                    right-0 
                    top-0 
                    pr-4 
                    pt-4 
                    sm:block
                  '>
                  <button
                    type='button'
                    onClick={onClose}>
                    <span className='sr-only'>Close</span>
                    <IoClose className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
