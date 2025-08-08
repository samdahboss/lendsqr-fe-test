import React, { useState, useMemo } from "react";
import { useUsers } from "@/hooks/useUsers";
import { StatsCards } from "./components/StatsCard";
import { FilterForm } from "./components/FilterForm";
import UsersTable from "./components/UsersTable";
import Pagination from "./components/Pagination";
import "./styles/index.scss";

export default function Users() {
  const [showFilters, setShowFilters] = useState(false);
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const {
    users,
    filters,
    setFilters,
    isLoading,
    error,
    allUsers,
    page,
    setPage,
    pageSize,
    setPageSize,
    total,
  } = useUsers();

  // Calculate statistics based on real data
  const stats = useMemo(() => {
    const totalUsers = allUsers.length;
    const activeUsers = allUsers.filter(
      (user) => user.status?.toLowerCase() === "active"
    ).length;
    const usersWithLoans = allUsers.filter(
      (user) =>
        user.status?.toLowerCase() === "pending" ||
        user.status?.toLowerCase() === "active"
    ).length;
    const usersWithSavings = allUsers.filter(
      (user) => user.status?.toLowerCase() === "active"
    ).length;

    return {
      total: totalUsers,
      active: activeUsers,
      withLoans: usersWithLoans,
      withSavings: usersWithSavings,
    };
  }, [allUsers]);

  // Sort functionality
  const sortedUsers = useMemo(() => {
    if (!sortColumn) return users;

    return [...users].sort((a, b) => {
      const aValue = a[sortColumn as keyof typeof a] || "";
      const bValue = b[sortColumn as keyof typeof b] || "";

      const comparison = String(aValue).localeCompare(String(bValue));
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [users, sortColumn, sortDirection]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  if (error) {
    return (
      <div className='users-page'>
        <div className='users-page__error'>
          <h3>Error Loading Users</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='users-page'>
      {/* Page Header */}
      <div className='users-page__header'>
        <h1>Users</h1>
      </div>

      {/* Stats Cards */}
      <div className='users-page__stats'>
        <StatsCards stats={stats} />
      </div>

      {/* Main Content */}
      <div className='users-page__content'>
        {isLoading ? (
          <div className='users-page__loading'>
            <div className='spinner'></div>
            Loading users...
          </div>
        ) : (
          <>
            <UsersTable
              users={sortedUsers}
              isLoading={isLoading}
              onSort={handleSort}
              sortColumn={sortColumn}
              onToggleFilters={toggleFilters}
              showFilters={showFilters}
            />

            {total > 0 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                itemsPerPage={pageSize}
                totalItems={total}
                onPageChange={setPage}
                onItemsPerPageChange={setPageSize}
              />
            )}
          </>
        )}

        {!isLoading && total === 0 && (
          <div className='users-page__empty'>
            <h3>No Users Found</h3>
            <p>Try adjusting your filters or check back later.</p>
          </div>
        )}
      </div>

      {/* Filter Overlay */}
      <FilterForm
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClose={() => setShowFilters(false)}
        isOpen={showFilters}
      />
    </div>
  );
}
