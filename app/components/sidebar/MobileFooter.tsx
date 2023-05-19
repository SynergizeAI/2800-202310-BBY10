"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import NavItem from "./NavItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div className='fixed justify-between w-full bottom-0 z-40 flex items-center border-t-[1px] lg:hidden'>
      {routes.map((route) => (
        <NavItem
          key={route.href}
          href={route.href}
          active={route.active}
          icon={route.icon}
          onClick={route.onClick}
          mobile={true}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
