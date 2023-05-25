"use client";

import { useState } from "react";
import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import NavItem from "./NavItem";
import { User } from "@prisma/client";
import SettingsModal from "./SettingsModal";
import Avatar from "../Avatar";

interface MobileFooterProps {
  currentUser: User;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isOpen) {
    return null;
  }

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className='fixed justify-evenly w-full bottom-0 z-40 flex items-center border-t-[1px] lg:hidden bg-slate-200'>
        <div>
          {routes.map((route) => (
            <NavItem
              key={route.href}
              href={route.href}
              // active={route.active}
              icon={route.icon}
              onClick={route.onClick}
              mobile={true}
            />
          ))}
        </div>
        <div onClick={() => setIsModalOpen(true)} className='cursor-pointer'>
          <Avatar user={currentUser} />
        </div>
      </div>
    </>
  );
};

export default MobileFooter;
