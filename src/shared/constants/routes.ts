export const PUBLIC_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
} as const;

export const SUPER_ADMIN_ROUTES = {
  DASHBOARD: '/dashboard',
  REQUESTS: '/requests',
  SCHOOLS: '/registered-schools',
  SETTINGS: '/account-settings',
} as const;

export const SCHOOL_ROUTES = {
  DASHBOARD: '/school-dashboard',
  PARENTS: '/parents',
  STUDENTS: '/students',
  RECEIVERS: '/receivers',
  TRUSTED_RECEIVERS: '/trusted-receivers',
  RECEIVE_REQUESTS: '/receive-requests',

} as const;

export const ROUTES = {
  ...PUBLIC_ROUTES,
  SUPER_ADMIN: SUPER_ADMIN_ROUTES,
  SCHOOL: SCHOOL_ROUTES,
} as const;

export const ROUTE_GROUPS = {
  PUBLIC: Object.values(PUBLIC_ROUTES),
  SUPER_ADMIN: Object.values(SUPER_ADMIN_ROUTES),
  SCHOOL: Object.values(SCHOOL_ROUTES),
} as const;

export const isPublicRoute = (path: string): boolean => {
  return (ROUTE_GROUPS.PUBLIC as readonly string[]).includes(path);
};

export const isSuperAdminRoute = (path: string): boolean => {
  return (ROUTE_GROUPS.SUPER_ADMIN as readonly string[]).includes(path);
};

export const isSchoolRoute = (path: string): boolean => {
  return (ROUTE_GROUPS.SCHOOL as readonly string[]).includes(path);
};

export const getDefaultRoute = (role: 'super_admin' | 'school' | null): string => {
  switch (role) {
    case 'super_admin':
      return SUPER_ADMIN_ROUTES.DASHBOARD;
    case 'school':
      return SCHOOL_ROUTES.DASHBOARD;
    default:
      return PUBLIC_ROUTES.LOGIN;
  }
};