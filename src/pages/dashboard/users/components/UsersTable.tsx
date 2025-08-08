import React, { useState } from "react";
import { User } from "../../../../hooks/useUsers";
import ActionMenu from "./ActionMenu";

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  onSort?: (column: string) => void;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  onToggleFilters?: () => void;
  showFilters?: boolean;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  isLoading,
  onSort,
  sortColumn,
  sortDirection,
  //   onToggleFilters,
  //   showFilters
}) => {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  const handleSort = (column: string) => {
    if (onSort) {
      onSort(column);
    }
  };

  const handleUserAction = (action: string, user: User) => {
    console.log(`Action: ${action} on user:`, user);
    setActiveMenuIndex(null);
    // Implement action logic here
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatStatus = (status?: string) => {
    if (!status) return "inactive";
    return status.toLowerCase();
  };

  const formatPhone = (phone?: string | number) => {
    if (!phone) return "";
    return String(phone);
  };

  if (isLoading) {
    return (
      <div className='users-table-container'>
        <div className='users-table users-table--loading'>
          <div
            style={{
              height: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Loading users...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='users-table-container'>
      <table className='users-table'>
        <thead className='users-table__header'>
          <tr>
            <th
              className={`sortable ${sortColumn === "organization" ? `sorted-${sortDirection}` : ""}`}
              onClick={() => handleSort("organization")}
            >
              Organization
            </th>
            <th
              className={`sortable ${sortColumn === "username" ? `sorted-${sortDirection}` : ""}`}
              onClick={() => handleSort("username")}
            >
              Username
            </th>
            <th
              className={`sortable ${sortColumn === "email" ? `sorted-${sortDirection}` : ""}`}
              onClick={() => handleSort("email")}
            >
              Email
            </th>
            <th
              className={`sortable ${sortColumn === "phone" ? `sorted-${sortDirection}` : ""}`}
              onClick={() => handleSort("phone")}
            >
              Phone Number
            </th>
            <th
              className={`sortable ${sortColumn === "date_joined" ? `sorted-${sortDirection}` : ""}`}
              onClick={() => handleSort("date_joined")}
            >
              Date Joined
            </th>
            <th
              className={`sortable ${sortColumn === "status" ? `sorted-${sortDirection}` : ""}`}
              onClick={() => handleSort("status")}
            >
              Status
            </th>
            <th>{/* Actions header with filter toggle */}</th>
          </tr>
        </thead>
        <tbody className='users-table__body'>
          {users.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: "2rem" }}>
                No users found
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user._id || index}>
                <td>{user.organization || "Lendsqr"}</td>
                <td>{user.username || user.firstName || "-"}</td>
                <td>{user.email || "-"}</td>
                <td>{formatPhone(user.phone)}</td>
                <td className='hide-mobile'>{formatDate(user.date_joined)}</td>
                <td>
                  <span
                    className={`users-table__status users-table__status--${formatStatus(user.status)}`}
                  >
                    {user.status || "Inactive"}
                  </span>
                </td>
                <td>
                  <div className='users-table__actions'>
                    <button
                      className='users-table__actions-button'
                      onClick={() =>
                        setActiveMenuIndex(
                          activeMenuIndex === index ? null : index
                        )
                      }
                    >
                      <svg viewBox='0 0 20 20' fill='currentColor'>
                        <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
                      </svg>
                    </button>
                    {activeMenuIndex === index && (
                      <>
                        <div
                          className='action-menu-overlay'
                          onClick={() => setActiveMenuIndex(null)}
                        />
                        <ActionMenu user={user} onAction={handleUserAction} />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
