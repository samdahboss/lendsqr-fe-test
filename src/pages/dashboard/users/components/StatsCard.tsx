import React from "react";
import { StatsCardData } from "../types";

interface StatsCardProps {
  data: StatsCardData;
}

export const StatsCard: React.FC<StatsCardProps> = ({ data }) => {
  // SVG icons for different card types
  const getIcon = (id: string) => {
    switch (id) {
      case "users":
        return (
          <svg viewBox='0 0 24 24' fill='currentColor'>
            <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
          </svg>
        );
      case "active-users":
        return (
          <svg viewBox='0 0 24 24' fill='currentColor'>
            <path d='M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.5 7h-5c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5H16v6h4zm-12.5-11c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.5 1h-3A1.5 1.5 0 0 0 4.5 13.5v6A1.5 1.5 0 0 0 6 21h3v-6.5A1.5 1.5 0 0 0 7.5 13z' />
          </svg>
        );
      case "users-with-loans":
        return (
          <svg viewBox='0 0 24 24' fill='currentColor'>
            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
          </svg>
        );
      case "users-with-savings":
        return (
          <svg viewBox='0 0 24 24' fill='currentColor'>
            <path d='M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z' />
          </svg>
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
  stats: {
    total: number;
    active: number;
    withLoans: number;
    withSavings: number;
  };
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const statsData: StatsCardData[] = [
    {
      id: "users",
      title: "USERS",
      value: stats.total,
      icon: "",
      color: "#DF18FF",
    },
    {
      id: "active-users",
      title: "ACTIVE USERS",
      value: stats.active,
      icon: "",
      color: "#5718FF",
    },
    {
      id: "users-with-loans",
      title: "USERS WITH LOANS",
      value: stats.withLoans,
      icon: "",
      color: "#F55F44",
    },
    {
      id: "users-with-savings",
      title: "USERS WITH SAVINGS",
      value: stats.withSavings,
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
