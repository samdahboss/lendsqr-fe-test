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
                <td>{user.username || "-"}</td>
                <td>{user.email || "-"}</td>
                <td>0{formatPhone(user.phone)}</td>
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
                      aria-label='More actions'
                    >
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M9.99992 6.1112C10.9221 6.1112 11.6666 5.36676 11.6666 4.44453C11.6666 3.52231 10.9221 2.77787 9.99992 2.77787C9.0777 2.77787 8.33325 3.52231 8.33325 4.44453C8.33325 5.36676 9.0777 6.1112 9.99992 6.1112Z'
                          fill='#545F7D'
                        />
                        <path
                          d='M9.99992 11.6666C10.9221 11.6666 11.6666 10.9221 11.6666 9.99992C11.6666 9.0777 10.9221 8.33325 9.99992 8.33325C9.0777 8.33325 8.33325 9.0777 8.33325 9.99992C8.33325 10.9221 9.0777 11.6666 9.99992 11.6666Z'
                          fill='#545F7D'
                        />
                        <path
                          d='M9.99992 17.2221C10.9221 17.2221 11.6666 16.4777 11.6666 15.5554C11.6666 14.6332 10.9221 13.8888 9.99992 13.8888C9.0777 13.8888 8.33325 14.6332 8.33325 15.5554C8.33325 16.4777 9.0777 17.2221 9.99992 17.2221Z'
                          fill='#545F7D'
                        />
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
