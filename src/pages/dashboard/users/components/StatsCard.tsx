import React from "react";
import { StatsCardData } from "../types";

interface StatsCardProps {
  data: StatsCardData;
}

export const StatsCard: React.FC<StatsCardProps> = ({ data }) => {
  // Using Figma SVG icons from the public/iconss folder
  const getIcon = (id: string) => {
    switch (id) {
      case "users":
        return (
          <img
            src='/iconss/np_users_1248631_000000 1.svg'
            alt='Users'
            width='20'
            height='20'
          />
        );
      case "active-users":
        return (
          <img
            src='/iconss/np_users_1977590_000000 1.svg'
            alt='Active Users'
            width='20'
            height='20'
          />
        );
      case "users-with-loans":
        return (
          <img
            src='/iconss/Group (1).svg'
            alt='Users with Loans'
            width='20'
            height='20'
          />
        );
      case "users-with-savings":
        return (
          <img
            src='/iconss/np_money_549109_000000 1.svg'
            alt='Users with Savings'
            width='20'
            height='20'
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className='stats-card'>
      <div
        className={`stats-card__icon stats-card__icon--${data.id.replace("users-", "").replace("-users", "")}`}
      >
        {getIcon(data.id)}
      </div>
      <div className='stats-card__content'>
        <h3 className='stats-card__title'>{data.title}</h3>
        <p className='stats-card__value'>{data.value.toLocaleString()}</p>
      </div>
    </div>
  );
};

interface StatsCardsProps {
  stats?: {
    total: number;
    active: number;
    withLoans: number;
    withSavings: number;
  };
}

export const StatsCards: React.FC<StatsCardsProps> = () => {
  const statsData: StatsCardData[] = [
    {
      id: "users",
      title: "USERS",
      value: 2453, // Matching Figma design
      icon: "",
      color: "#DF18FF",
    },
    {
      id: "active-users",
      title: "ACTIVE USERS",
      value: 2453, // Matching Figma design
      icon: "",
      color: "#5718FF",
    },
    {
      id: "users-with-loans",
      title: "USERS WITH LOANS",
      value: 12453, // Matching Figma design
      icon: "",
      color: "#F55F44",
    },
    {
      id: "users-with-savings",
      title: "USERS WITH SAVINGS",
      value: 102453, // Matching Figma design
      icon: "",
      color: "#FF3366",
    },
  ];

  return (
    <div className='stats-cards'>
      {statsData.map((stat) => (
        <StatsCard key={stat.id} data={stat} />
      ))}
    </div>
  );
};
