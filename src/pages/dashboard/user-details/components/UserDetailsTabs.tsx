import React from "react";
import { UserDetailsTabsProps } from "../types";
import "./UserDetailsTabs.scss";

const tabs = [
  "General Details",
  "Documents",
  "Bank Details",
  "Loans",
  "Savings",
  "App and System",
];

const UserDetailsTabs: React.FC<UserDetailsTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className='user-details-tabs'>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab ${activeTab === tab ? "active" : ""}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default UserDetailsTabs;
