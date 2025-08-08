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

  // Filtering logic (refactored for maintainability)
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const userValue = user[key as keyof User];
        if (userValue == null) return false;
        // For date, allow partial match
        if (key === "date") {
          return String(user["date_joined"] ?? "").includes(String(value));
        }
        // For phone, match as string includes
        if (key === "phone") {
          return String(userValue).includes(String(value));
        }
        // For status and organization, match case-insensitive equality
        if (key === "status" || key === "organization") {
          return (
            String(userValue).toLowerCase() === String(value).toLowerCase()
          );
        }
        // For other fields, case-insensitive substring match
        return String(userValue)
          .toLowerCase()
          .includes(String(value).toLowerCase());
      });
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
