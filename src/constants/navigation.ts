import {
  Building2,
  Home,
  Users,
  UserCheck,
  Banknote,
  HandHeart,
  PiggyBank,
  FileText,
  UserX,
  Briefcase,
  Building,
  Coins,
  ArrowRightLeft,
  Zap,
  Settings,
  Scroll,
  BarChart3,
  Sliders,
  Percent,
  ClipboardList,
  LucideIcon,
} from "lucide-react";
import { ROUTES } from "../routes/routeConstants";

export interface NavigationItem {
  name: string;
  icon: LucideIcon;
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
        icon: Building2,
        path: "#",
        hasDropdown: true,
      },
      { name: "Dashboard", icon: Home, path: ROUTES.DASHBOARD },
    ],
  },
  {
    title: "CUSTOMERS",
    items: [
      { name: "Users", icon: Users, path: ROUTES.USERS },
      { name: "Guarantors", icon: UserCheck, path: "#" },
      { name: "Loans", icon: Banknote, path: "#" },
      { name: "Decision Models", icon: HandHeart, path: "#" },
      { name: "Savings", icon: PiggyBank, path: "#" },
      { name: "Loan Requests", icon: FileText, path: "#" },
      { name: "Whitelist", icon: UserCheck, path: "#" },
      { name: "Karma", icon: UserX, path: "#" },
    ],
  },
  {
    title: "BUSINESSES",
    items: [
      { name: "Organization", icon: Briefcase, path: "#" },
      { name: "Loan Products", icon: FileText, path: "#" },
      { name: "Savings Products", icon: Building, path: "#" },
      { name: "Fees and Charges", icon: Coins, path: "#" },
      { name: "Transactions", icon: ArrowRightLeft, path: "#" },
      { name: "Services", icon: Zap, path: "#" },
      { name: "Service Account", icon: Settings, path: "#" },
      { name: "Settlements", icon: Scroll, path: "#" },
      { name: "Reports", icon: BarChart3, path: "#" },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { name: "Preferences", icon: Sliders, path: "#" },
      { name: "Fees and Pricing", icon: Percent, path: "#" },
      { name: "Audit Logs", icon: ClipboardList, path: "#" },
    ],
  },
];
