import React from "react";

interface CustomIconProps {
  name: string;
  size?: number;
  className?: string;
}

export const CustomIcon: React.FC<CustomIconProps> = ({
  name,
  size = 16,
  className = "",
}) => {
  // Import the icon dynamically
  const iconPath = new URL(`../../assets/icons/${name}`, import.meta.url).href;

  return (
    <img
      src={iconPath}
      alt={`${name} icon`}
      width={size}
      height={size}
      className={`custom-icon ${className}`}
      style={{
        objectFit: "contain",
      }}
    />
  );
};

// Individual icon components for better type safety
export const HomeIcon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon name='home 1.svg' {...props} />
);

export const UsersIcon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon name='users 1.svg' {...props} />
);

export const UserFriendsIcon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon name='user-friends 1.svg' {...props} />
);

export const SackIcon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon name='sack 1.svg' {...props} />
);

export const HandshakeIcon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon name='handshake-regular 1.svg' {...props} />
);

export const PiggyBankIcon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon name='piggy-bank 1.svg' {...props} />
);

export const Group104Icon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon name='Group 104.svg' {...props} />
);

export const UserCheckIcon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon name='user-check 1.svg' {...props} />
);

export const UserTimesIcon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon name='user-times 1.svg' {...props} />
);

export const BriefcaseIcon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon name='briefcase 1.svg' {...props} />
);

export const BankIcon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon name='np_bank_148501_000000 1.svg' {...props} />
);

export const CoinsIcon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon name='coins-solid 1.svg' {...props} />
);

export const FeesIcon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon name='icon.svg' {...props} />
);

export const ClipboardIcon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon name='clipboard-list 1.svg' {...props} />
);

export const SlidersIcon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon name='sliders-h 1.svg' {...props} />
);

export const UserCogIcon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon name='user-cog 1.svg' {...props} />
);

export const ScrollIcon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon name='scroll 1.svg' {...props} />
);

export const ChartBarIcon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon name='chart-bar 2.svg' {...props} />
);

export const BadgePercentIcon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon name='badge-percent 1.svg' {...props} />
);

export const GalaxyIcon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon name='galaxy 1.svg' {...props} />
);
