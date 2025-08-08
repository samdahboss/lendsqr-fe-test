export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  USERS: "/dashboard/users",
  USER_DETAILS: "/dashboard/users/:id",
} as const;

export const ROUTE_PATHS = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  USERS: "/dashboard/users",
  USER_DETAILS: (id: string) => `/dashboard/users/${id}`,
} as const;
