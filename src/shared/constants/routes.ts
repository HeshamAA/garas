export const PUBLIC_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  OWNER_REGISTRATION: '/owner-registration',
} as const;

export const USER_ROUTES = {
  PROFILE: '/user-profile',
  REQUESTS: '/requests',
  SCHOOLS: '/registered-schools',
  SETTINGS: '/account-settings',
} as const;

export const SCHOOL_ROUTES = {
  PROFILE: '/school-profile',
  PARENTS: '/parents',
  STUDENTS: '/students',
  RECEIVERS: '/receivers',
  TRUSTED_RECEIVERS: '/trusted-receivers',
  RECEIVE_REQUESTS: '/receive-requests',
  SETTINGS: '/account-settings',
} as const;

export const ROUTES = {
  ...PUBLIC_ROUTES,
  USER: USER_ROUTES,
  SCHOOL: SCHOOL_ROUTES,
} as const;

export const ROUTE_GROUPS = {
  PUBLIC: Object.values(PUBLIC_ROUTES),
  USER: Object.values(USER_ROUTES),
  SCHOOL: Object.values(SCHOOL_ROUTES),
} as const;

export const isPublicRoute = (path: string): boolean => {
  return (ROUTE_GROUPS.PUBLIC as readonly string[]).includes(path);
};

export const isUserRoute = (path: string): boolean => {
  return (ROUTE_GROUPS.USER as readonly string[]).includes(path);
};

export const isSchoolRoute = (path: string): boolean => {
  return (ROUTE_GROUPS.SCHOOL as readonly string[]).includes(path);
};

export const getDefaultRoute = (role: 'owner' | 'school' | 'parent' | 'student' | 'deliveryPerson' | null): string => {
  switch (role) {
    case 'owner':
    case 'parent':
      return '/dashboard';
    case 'school':
      return '/school-dashboard';
    case 'student':
      return '/dashboard';
    case 'deliveryPerson':
      return '/dashboard';
    default:
      return PUBLIC_ROUTES.LOGIN;
  }
};