import React from "react";
import { StatsCardData } from "../types";

interface StatsCardProps {
  data: StatsCardData;
}

export const StatsCard: React.FC<StatsCardProps> = ({ data }) => {
  // SVG icons for different card types - matching Figma design
  const getIcon = (id: string) => {
    switch (id) {
      case "users":
        return (
          <svg
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.5 2.33317C10.5 3.6238 9.45594 4.6665 8.16667 4.6665C6.87741 4.6665 5.83334 3.6238 5.83334 2.33317C5.83334 1.04381 6.87741 0 8.16667 0C9.45594 0 10.5 1.04381 10.5 2.33317Z'
              fill='#DF18FF'
            />
            <path
              d='M8.16667 5.8335C5.945 5.8335 4.08334 7.14683 4.08334 8.75016C4.08334 9.55183 4.98084 10.5002 6.41667 11.0835V14.0002H9.91667V11.0835C11.3525 10.5002 12.25 9.55183 12.25 8.75016C12.25 7.14683 10.3883 5.8335 8.16667 5.8335Z'
              fill='#DF18FF'
            />
            <path
              d='M2.91667 4.0835C2.91667 5.01683 2.18 5.75016 1.25 5.75016C0.32 5.75016 -0.416666 5.01683 -0.416666 4.0835C-0.416666 3.15016 0.32 2.41683 1.25 2.41683C2.18 2.41683 2.91667 3.15016 2.91667 4.0835Z'
              fill='#DF18FF'
            />
            <path
              d='M4.08333 7.5835C3.85166 7.6335 3.62832 7.69516 3.41499 7.77683C2.45832 8.09016 1.74999 8.62516 1.74999 9.3335C1.74999 9.74183 2.21832 10.1918 2.91666 10.5002V12.8335H0.583328V10.5002C-0.187505 10.0918 -0.583339 9.66683 -0.583339 9.3335C-0.583339 8.3585 0.765828 7.5835 2.50833 7.5835H4.08333Z'
              fill='#DF18FF'
            />
          </svg>
        );
      case "active-users":
        return (
          <svg
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.5 2.33317C10.5 3.6238 9.45594 4.6665 8.16667 4.6665C6.87741 4.6665 5.83334 3.6238 5.83334 2.33317C5.83334 1.04381 6.87741 0 8.16667 0C9.45594 0 10.5 1.04381 10.5 2.33317Z'
              fill='#5718FF'
            />
            <path
              d='M8.16667 5.8335C5.945 5.8335 4.08334 7.14683 4.08334 8.75016C4.08334 9.55183 4.98084 10.5002 6.41667 11.0835V14.0002H9.91667V11.0835C11.3525 10.5002 12.25 9.55183 12.25 8.75016C12.25 7.14683 10.3883 5.8335 8.16667 5.8335Z'
              fill='#5718FF'
            />
            <path
              d='M2.91667 4.0835C2.91667 5.01683 2.18 5.75016 1.25 5.75016C0.32 5.75016 -0.416666 5.01683 -0.416666 4.0835C-0.416666 3.15016 0.32 2.41683 1.25 2.41683C2.18 2.41683 2.91667 3.15016 2.91667 4.0835Z'
              fill='#5718FF'
            />
            <path
              d='M4.08333 7.5835C3.85166 7.6335 3.62832 7.69516 3.41499 7.77683C2.45832 8.09016 1.74999 8.62516 1.74999 9.3335C1.74999 9.74183 2.21832 10.1918 2.91666 10.5002V12.8335H0.583328V10.5002C-0.187505 10.0918 -0.583339 9.66683 -0.583339 9.3335C-0.583339 8.3585 0.765828 7.5835 2.50833 7.5835H4.08333Z'
              fill='#5718FF'
            />
          </svg>
        );
      case "users-with-loans":
        return (
          <svg
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4.66668 2.33317C4.66668 3.6238 3.62262 4.6665 2.33335 4.6665C1.04409 4.6665 2.38419e-07 3.6238 2.38419e-07 2.33317C2.38419e-07 1.04381 1.04409 0 2.33335 0C3.62262 0 4.66668 1.04381 4.66668 2.33317Z'
              fill='#F55F44'
            />
            <path
              d='M2.33335 5.8335C1.05835 5.8335 0.350016 7.14683 0.350016 8.75016C0.350016 9.55183 1.24752 10.5002 2.68335 11.0835V14.0002H6.18335V11.0835C7.61918 10.5002 8.51668 9.55183 8.51668 8.75016C8.51668 7.14683 5.60835 5.8335 2.33335 5.8335Z'
              fill='#F55F44'
            />
            <path
              d='M10.5 4.0835C10.5 5.01683 9.76334 5.75016 8.83334 5.75016C7.90334 5.75016 7.16668 5.01683 7.16668 4.0835C7.16668 3.15016 7.90334 2.41683 8.83334 2.41683C9.76334 2.41683 10.5 3.15016 10.5 4.0835Z'
              fill='#F55F44'
            />
            <path
              d='M13.4167 7.5835C12.4583 7.5835 11.6667 8.3585 11.6667 9.3335C11.6667 9.66683 12.0625 10.0918 12.8333 10.5002V12.8335H15.1667V10.5002C15.9375 10.1918 16.3333 9.74183 16.3333 9.3335C16.3333 8.62516 15.625 8.09016 14.6667 7.77683C14.4533 7.69516 14.23 7.6335 13.9983 7.5835H13.4167Z'
              fill='#F55F44'
            />
          </svg>
        );
      case "users-with-savings":
        return (
          <svg
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0ZM7 1.16667C10.2467 1.16667 12.8333 3.75334 12.8333 7C12.8333 10.2467 10.2467 12.8333 7 12.8333C3.75334 12.8333 1.16667 10.2467 1.16667 7C1.16667 3.75334 3.75334 1.16667 7 1.16667Z'
              fill='#FF3366'
            />
            <path
              d='M7.58333 3.5V4.08333H8.16667V5.25H7.58333V5.83333H6.41667V5.25H5.83333V4.08333H6.41667V3.5H7.58333ZM7.58333 8.16667V10.5H6.41667V8.16667H7.58333Z'
              fill='#FF3366'
            />
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
