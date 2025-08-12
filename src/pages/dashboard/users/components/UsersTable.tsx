import React, { useState, useEffect } from "react";
import { User } from "@/hooks/useUsers";

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
  onToggleFilters,
  // showFilters
}) => {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveMenuIndex(null);
    };

    if (activeMenuIndex !== null) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [activeMenuIndex]);

  const handleSort = (column: string) => {
    if (onSort) {
      onSort(column);
    }
  };

  const toggleActionMenu = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveMenuIndex(activeMenuIndex === index ? null : index);
  };

  const handleUserAction = (action: string, user: User) => {
    console.log(`${action} user:`, user);
    setActiveMenuIndex(null);
    // Here you would implement the actual actions
    // like routing to user details, updating user status, etc.
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
              <div className='header-content'>
                <span>Organization</span>
                <button
                  className='filter-btn'
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFilters?.();
                  }}
                >
                  <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                    <path
                      d='M6.22222 13.3333H9.77778V11.5556H6.22222V13.3333ZM0 2.66667V4.44444H16V2.66667H0ZM2.66667 8.88889H13.3333V7.11111H2.66667V8.88889Z'
                      fill='#545F7D'
                    />
                  </svg>
                </button>
              </div>
            </th>
            <th
              className={`sortable ${sortColumn === "username" ? `sorted-${sortDirection}` : ""}`}
              onClick={() => handleSort("username")}
            >
              <div className='header-content'>
                <span>Username</span>
                <button
                  className='filter-btn'
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFilters?.();
                  }}
                >
                  <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                    <path
                      d='M6.22222 13.3333H9.77778V11.5556H6.22222V13.3333ZM0 2.66667V4.44444H16V2.66667H0ZM2.66667 8.88889H13.3333V7.11111H2.66667V8.88889Z'
                      fill='#545F7D'
                    />
                  </svg>
                </button>
              </div>
            </th>
            <th
              className={`sortable ${sortColumn === "email" ? `sorted-${sortDirection}` : ""}`}
              onClick={() => handleSort("email")}
            >
              <div className='header-content'>
                <span>Email</span>
                <button
                  className='filter-btn'
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFilters?.();
                  }}
                >
                  <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                    <path
                      d='M6.22222 13.3333H9.77778V11.5556H6.22222V13.3333ZM0 2.66667V4.44444H16V2.66667H0ZM2.66667 8.88889H13.3333V7.11111H2.66667V8.88889Z'
                      fill='#545F7D'
                    />
                  </svg>
                </button>
              </div>
            </th>
            <th
              className={`sortable ${sortColumn === "phone" ? `sorted-${sortDirection}` : ""}`}
              onClick={() => handleSort("phone")}
            >
              <div className='header-content'>
                <span>Phone Number</span>
                <button
                  className='filter-btn'
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFilters?.();
                  }}
                >
                  <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                    <path
                      d='M6.22222 13.3333H9.77778V11.5556H6.22222V13.3333ZM0 2.66667V4.44444H16V2.66667H0ZM2.66667 8.88889H13.3333V7.11111H2.66667V8.88889Z'
                      fill='#545F7D'
                    />
                  </svg>
                </button>
              </div>
            </th>
            <th
              className={`sortable ${sortColumn === "date_joined" ? `sorted-${sortDirection}` : ""}`}
              onClick={() => handleSort("date_joined")}
            >
              <div className='header-content'>
                <span>Date Joined</span>
                <button
                  className='filter-btn'
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFilters?.();
                  }}
                >
                  <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                    <path
                      d='M6.22222 13.3333H9.77778V11.5556H6.22222V13.3333ZM0 2.66667V4.44444H16V2.66667H0ZM2.66667 8.88889H13.3333V7.11111H2.66667V8.88889Z'
                      fill='#545F7D'
                    />
                  </svg>
                </button>
              </div>
            </th>
            <th
              className={`sortable ${sortColumn === "status" ? `sorted-${sortDirection}` : ""}`}
              onClick={() => handleSort("status")}
            >
              <div className='header-content'>
                <span>Status</span>
                <button
                  className='filter-btn'
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFilters?.();
                  }}
                >
                  <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                    <path
                      d='M6.22222 13.3333H9.77778V11.5556H6.22222V13.3333ZM0 2.66667V4.44444H16V2.66667H0ZM2.66667 8.88889H13.3333V7.11111H2.66667V8.88889Z'
                      fill='#545F7D'
                    />
                  </svg>
                </button>
              </div>
            </th>
            <th>{/* Actions header */}</th>
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
                  <div
                    className='users-table__actions'
                    style={{ position: "relative" }}
                  >
                    <button
                      className='users-table__actions-button'
                      onClick={(e) => toggleActionMenu(index, e)}
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

                    {/* Action Menu */}
                    {activeMenuIndex === index && (
                      <div
                        className='action-menu'
                        style={{
                          position: "absolute",
                          top: "100%",
                          right: "0",
                          backgroundColor: "white",
                          border: "1px solid #e5e5e5",
                          borderRadius: "4px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                          zIndex: 1000,
                          minWidth: "180px",
                          padding: "8px 0",
                        }}
                      >
                        <button
                          className='action-menu__item'
                          onClick={() => handleUserAction("View Details", user)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            width: "100%",
                            padding: "12px 16px",
                            border: "none",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                            fontSize: "14px",
                            color: "#545F7D",
                            textAlign: "left",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#f8f9fb")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "transparent")
                          }
                        >
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                          >
                            <path
                              d='M8 9.5C8.82843 9.5 9.5 8.82843 9.5 8C9.5 7.17157 8.82843 6.5 8 6.5C7.17157 6.5 6.5 7.17157 6.5 8C6.5 8.82843 7.17157 9.5 8 9.5Z'
                              fill='#545F7D'
                            />
                            <path
                              d='M8 1C4.5 1 1.73 3.11 1 8C1.73 12.89 4.5 15 8 15C11.5 15 14.27 12.89 15 8C14.27 3.11 11.5 1 8 1ZM8 13C5.24 13 2.83 11.36 2.18 8C2.83 4.64 5.24 3 8 3C10.76 3 13.17 4.64 13.82 8C13.17 11.36 10.76 13 8 13Z'
                              fill='#545F7D'
                            />
                          </svg>
                          View Details
                        </button>

                        <button
                          className='action-menu__item'
                          onClick={() =>
                            handleUserAction("Blacklist User", user)
                          }
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            width: "100%",
                            padding: "12px 16px",
                            border: "none",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                            fontSize: "14px",
                            color: "#545F7D",
                            textAlign: "left",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#f8f9fb")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "transparent")
                          }
                        >
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                          >
                            <path
                              d='M8 1C4.13 1 1 4.13 1 8C1 11.87 4.13 15 8 15C11.87 15 15 11.87 15 8C15 4.13 11.87 1 8 1ZM11 10.59L10.59 11L8 8.41L5.41 11L5 10.59L7.59 8L5 5.41L5.41 5L8 7.59L10.59 5L11 5.41L8.41 8L11 10.59Z'
                              fill='#545F7D'
                            />
                          </svg>
                          Blacklist User
                        </button>

                        <button
                          className='action-menu__item'
                          onClick={() =>
                            handleUserAction("Activate User", user)
                          }
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            width: "100%",
                            padding: "12px 16px",
                            border: "none",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                            fontSize: "14px",
                            color: "#545F7D",
                            textAlign: "left",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#f8f9fb")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "transparent")
                          }
                        >
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                          >
                            <path
                              d='M8 1C4.13 1 1 4.13 1 8C1 11.87 4.13 15 8 15C11.87 15 15 11.87 15 8C15 4.13 11.87 1 8 1ZM7 11L3.5 7.5L4.91 6.09L7 8.17L11.09 4.09L12.5 5.5L7 11Z'
                              fill='#545F7D'
                            />
                          </svg>
                          Activate User
                        </button>
                      </div>
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
