"use client";

import Link from "next/link";
import clsx from "clsx";

interface NavItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
  mobile: boolean;
}

const NavItem: React.FC<NavItemProps> = (props) => {
  const { icon: Icon, href, onClick, active, mobile } = props;

  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        "flex gap-x-3  justify-center p-3",
        active && "",
        mobile && "w-full p-4",
        !mobile && ""
      )}>
      <Icon className='h-6 w-6' />
    </Link>
  );
};

export default NavItem;

// group flex gap-x-3 rounded-md p-3 text-sm leading-6 justify-center font-semibold text-gray-500 hover:text-black hover:bg-gray-10
// group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100

// desktop
// mobile
