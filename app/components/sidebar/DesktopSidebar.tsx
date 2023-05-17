"use client";

import useRoutes from "@/app/hooks/useRoutes";
import { User } from "@prisma/client";
import { useState } from "react";
import NavItem from "./NavItem";
import Avatar from "../Avatar";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between'>
      <nav className='mt-4 flex flex-col justify-between'>
        <ul role='list' className='flex flex-col items-center space-y-1'>
          {routes.map((item) => (
            <NavItem
              key={item.label}
              href={item.href}
              icon={item.icon}
              active={item.active}
              onClick={item.onClick}
              mobile={false}
            />
          ))}
        </ul>
      </nav>
      <nav className='mt-4 flex flex-col justify-between items-center'>
        <div
          onClick={() => setIsOpen(true)}
          className='cursor-pointer hover:opacity transition'>
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  );
};

export default DesktopSidebar;
