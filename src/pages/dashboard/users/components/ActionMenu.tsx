import React from "react";
import { User } from "@/hooks/useUsers";

interface ActionMenuProps {
  user: User;
  onAction: (action: string, user: User) => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ user, onAction }) => {
  const menuItems = [
    {
      action: "view",
      label: "View Details",
      icon: (
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M8 1.5C4.96447 1.5 2.18295 3.69494 1.01991 7C2.18295 10.3051 4.96447 12.5 8 12.5C11.0355 12.5 13.817 10.3051 14.9801 7C13.817 3.69494 11.0355 1.5 8 1.5Z'
            stroke='#545F7D'
            strokeWidth='1.4'
          />
          <path
            d='M8 9.5C9.10457 9.5 10 8.60457 10 7.5C10 6.39543 9.10457 5.5 8 5.5C6.89543 5.5 6 6.39543 6 7.5C6 8.60457 6.89543 9.5 8 9.5Z'
            stroke='#545F7D'
            strokeWidth='1.4'
          />
        </svg>
      ),
      className: "action-menu__item--view",
    },
    {
      action: "blacklist",
      label: "Blacklist User",
      icon: (
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5Z'
            stroke='#E4033B'
            strokeWidth='1.4'
          />
          <path
            d='M10.5 5.5L5.5 10.5'
            stroke='#E4033B'
            strokeWidth='1.4'
            strokeLinecap='round'
          />
        </svg>
      ),
      className: "action-menu__item--blacklist",
    },
    {
      action: "activate",
      label: "Activate User",
      icon: (
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M7.33333 10.6667L12.6667 5.33333L14 6.66667L7.33333 13.3333L2 8L3.33333 6.66667L7.33333 10.6667Z'
            fill='#39CD62'
          />
        </svg>
      ),
      className: "action-menu__item--activate",
    },
  ];

  return (
    <>
      {menuItems.map((item) => (
        <button
          key={item.action}
          className={`action-menu__item ${item.className}`}
          onClick={() => onAction(item.action, user)}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </>
  );
};

export default ActionMenu;
