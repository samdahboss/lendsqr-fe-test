import React from "react";
import { ROUTES } from "../routes/routeConstants";

// Define custom icon component type
export type IconComponent = React.ComponentType<{
  className?: string;
  size?: number;
}>;

// Custom icon wrapper for our SVG icons
const createCustomIcon = (iconName: string): IconComponent => {
  return ({ className, size = 16 }) => {
    return React.createElement("img", {
      src: `/icons/${iconName}`,
      alt: `${iconName} icon`,
      width: size,
      height: size,
      className: `custom-icon ${className || ""}`,
      style: { objectFit: "contain" as const },
    });
  };
};

// Create custom icon components
const HomeIcon = createCustomIcon("home 1.svg");
const UsersIcon = createCustomIcon("users 1.svg");
const UserFriendsIcon = createCustomIcon("user-friends 1.svg");
const SackIcon = createCustomIcon("sack 1.svg");
const HandshakeIcon = createCustomIcon("handshake-regular 1.svg");
const PiggyBankIcon = createCustomIcon("piggy-bank 1.svg");
const Group104Icon = createCustomIcon("Group 104.svg");
const UserCheckIcon = createCustomIcon("user-check 1.svg");
const UserTimesIcon = createCustomIcon("user-times 1.svg");
const BriefcaseIcon = createCustomIcon("briefcase 1.svg");
const BankIcon = createCustomIcon("np_bank_148501_000000 1.svg");
// const CoinsIcon = createCustomIcon('coins-solid 1.svg');
const FeesIcon = createCustomIcon("icon.svg");
const ClipboardIcon = createCustomIcon("clipboard-list 1.svg");
const SlidersIcon = createCustomIcon("sliders-h 1.svg");
const UserCogIcon = createCustomIcon("user-cog 1.svg");
const ScrollIcon = createCustomIcon("scroll 1.svg");
const ChartBarIcon = createCustomIcon("chart-bar 2.svg");
const BadgePercentIcon = createCustomIcon("badge-percent 1.svg");
const GalaxyIcon = createCustomIcon("galaxy 1.svg");

export interface NavigationItem {
  name: string;
  icon: IconComponent;
  path: string;
  hasDropdown?: boolean;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export const NAVIGATION_SECTIONS: NavigationSection[] = [
  {
    title: "",
    items: [
      {
        name: "Switch Organization",
        icon: BriefcaseIcon,
        path: "#",
        hasDropdown: true,
      },
    ],
  },
  {
    title: "",
    items: [{ name: "Dashboard", icon: HomeIcon, path: ROUTES.DASHBOARD }],
  },
  {
    title: "CUSTOMERS",
    items: [
      { name: "Users", icon: UsersIcon, path: ROUTES.USERS },
      { name: "Guarantors", icon: UserFriendsIcon, path: "#" },
      { name: "Loans", icon: SackIcon, path: "#" },
      { name: "Decision Models", icon: HandshakeIcon, path: "#" },
      { name: "Savings", icon: PiggyBankIcon, path: "#" },
      { name: "Loan Requests", icon: Group104Icon, path: "#" },
      { name: "Whitelist", icon: UserCheckIcon, path: "#" },
      { name: "Karma", icon: UserTimesIcon, path: "#" },
    ],
  },
  {
    title: "BUSINESSES",
    items: [
      { name: "Organization", icon: BriefcaseIcon, path: "#" },
      { name: "Loan Products", icon: Group104Icon, path: "#" },
      { name: "Savings Products", icon: BankIcon, path: "#" },
      { name: "Fees and Charges", icon: FeesIcon, path: "#" },
      { name: "Transactions", icon: ClipboardIcon, path: "#" },
      { name: "Services", icon: SlidersIcon, path: "#" },
      { name: "Service Account", icon: UserCogIcon, path: "#" },
      { name: "Settlements", icon: ScrollIcon, path: "#" },
      { name: "Reports", icon: ChartBarIcon, path: "#" },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { name: "Preferences", icon: SlidersIcon, path: "#" },
      { name: "Fees and Pricing", icon: BadgePercentIcon, path: "#" },
      { name: "Audit Logs", icon: GalaxyIcon, path: "#" },
    ],
  },
];
