/**
 * @file This file contains the DesktopSidebar component, which displays the desktop version of the sidebar with navigation items and user settings.
 */
"use client";

import useRoutes from "@/app/hooks/useRoutes";
import { User } from "@prisma/client";
import { useState } from "react";
import NavItem from "./NavItem";
import Avatar from "../Avatar";
import SettingsModal from "./SettingsModal";

// Define the properties of the DesktopSidebar component
interface DesktopSidebarProps {
  currentUser: User;
}

/**
 * The DesktopSidebar component displays the desktop version of the sidebar with navigation items and user settings.
 *
 * @param {object} props - The properties for the component.
 * @param {User} props.currentUser - The current logged-in user.
 * @returns {JSX.Element} The rendered component.
 */
const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingsModal currentUser={currentUser} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between'>
        {/* Main navigation */}
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
        {/* User settings */}
        <nav className='mt-4 flex flex-col justify-between items-center'>
          <div
            onClick={() => setIsOpen(true)}
            className='cursor-pointer hover:opacity transition'>
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
