import { useEffect, useState, useMemo } from "react";

export interface User {
  _id?: string;
  organization?: string;
  username?: string;
  email?: string;
  phone?: string | number;
  date_joined?: string;
  status?: string;
}

export interface UserFilters {
  organization?: string;
  username?: string;
  email?: string;
  date?: string;
  phone?: string;
  status?: string;
}

export function useUsers(initialFilters: UserFilters = {}) {
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<UserFilters>(initialFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setIsLoading(true);
    fetch("/users.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  // Filtering logic
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Organization
      if (
        filters.organization &&
        user.organization?.toLowerCase() !== filters.organization.toLowerCase()
      ) {
        return false;
      }
      // Username
      if (
        filters.username &&
        !user.username?.toLowerCase().includes(filters.username.toLowerCase())
      ) {
        return false;
      }
      // Email
      if (
        filters.email &&
        !user.email?.toLowerCase().includes(filters.email.toLowerCase())
      ) {
        return false;
      }
      // Date (exact match or partial)
      if (
        filters.date &&
        user.date_joined &&
        !user.date_joined.includes(filters.date)
      ) {
        return false;
      }
      // Phone
      if (
        filters.phone &&
        user.phone &&
        !String(user.phone).includes(filters.phone)
      ) {
        return false;
      }
      // Status
      if (
        filters.status &&
        user.status?.toLowerCase() !== filters.status.toLowerCase()
      ) {
        return false;
      }
      return true;
    });
  }, [users, filters]);

  // Pagination logic
  const total = filteredUsers.length;
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, page, pageSize]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  return {
    users: paginatedUsers,
    filters,
    setFilters,
    isLoading,
    error,
    allUsers: users, // unfiltered
    page,
    setPage,
    pageSize,
    setPageSize,
    total,
    filteredUsers, // all filtered, not paginated
  };
}
