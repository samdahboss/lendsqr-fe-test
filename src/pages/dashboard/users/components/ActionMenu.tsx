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
        <svg viewBox='0 0 20 20' fill='currentColor'>
          <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
          <path
            fillRule='evenodd'
            d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
            clipRule='evenodd'
          />
        </svg>
      ),
      className: "action-menu__item--view",
    },
    {
      action: "blacklist",
      label: "Blacklist User",
      icon: (
        <svg viewBox='0 0 20 20' fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z'
            clipRule='evenodd'
          />
        </svg>
      ),
      className: "action-menu__item--blacklist",
    },
    {
      action: "activate",
      label: "Activate User",
      icon: (
        <svg viewBox='0 0 20 20' fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
            clipRule='evenodd'
          />
        </svg>
      ),
      className: "action-menu__item--activate",
    },
  ];

  return (
    <div className='action-menu'>
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
    </div>
  );
};

export default ActionMenu;
