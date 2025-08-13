import { User } from "@/hooks/useUsers";

// Re-export types from the hook to maintain consistency
export type { User, UserFilters } from "@/hooks/useUsers";

export interface UserStats {
  total: number;
  active: number;
  withLoans: number;
  withSavings: number;
}

export interface StatsCardData {
  id: string;
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

export interface FilterOptions {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

export interface UserActionMenuProps {
  user: User;
  onAction: (action: string, user: User) => void;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface PaginationInfo {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
