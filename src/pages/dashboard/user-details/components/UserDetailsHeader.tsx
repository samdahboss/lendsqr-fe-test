import React from "react";
import { UserDetailsHeaderProps } from "../types";
import "./UserDetailsHeader.scss";

const UserDetailsHeader: React.FC<UserDetailsHeaderProps> = ({ user }) => {
  const renderStars = (tier: number) => {
    return Array.from({ length: 3 }, (_, index) => (
      <span key={index} className={`star ${index < tier ? "filled" : ""}`}>
        ★
      </span>
    ));
  };

  return (
    <div className='user-details-header'>
      <div className='user-summary'>
        <div className='user-info'>
          <div className='user-avatar'>
            {/* SVG avatar icon */}
            <svg
              width='100'
              height='100'
              viewBox='0 0 100 100'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='50' cy='50' r='50' fill='#E5E8EF' />
              <circle
                cx='50'
                cy='42'
                r='16'
                stroke='#213F7D'
                strokeWidth='2'
                fill='none'
              />
              <path
                d='M20 80c0-13.255 13.431-24 30-24s30 10.745 30 24'
                stroke='#213F7D'
                strokeWidth='2'
                fill='none'
              />
            </svg>
          </div>
          <div className='user-details-basic'>
            <h2>{user.personalInformation.fullName}</h2>
            <p className='user-id'>{user.userId}</p>
          </div>
        </div>

        <div className='user-tier'>
          <p>User's Tier</p>
          <div className='stars'>{renderStars(user.userTier)}</div>
        </div>

        <div className='user-balance'>
          <h3>{user.accountBalance}</h3>
          <p>
            {user.accountNumber}/{user.bank}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsHeader;
