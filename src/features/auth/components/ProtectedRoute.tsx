import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/shared/hooks';
import { setUser, setToken } from '../store/authSlice';
import { restoreSession } from '../store/authThunks';
import { PUBLIC_ROUTES, getDefaultRoute } from '@/shared/constants/routes';
import { UserRole } from '../types/auth.types';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ 
  children, 
  requiredRole,
  allowedRoles 
}: ProtectedRouteProps) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      const session = restoreSession();
      if (session) {
        dispatch(setUser(session.user));
        dispatch(setToken(session.token));
      }
    }
    setIsChecking(false);
  }, [isAuthenticated, dispatch]);

  if (isChecking) {
    return null;
  }

  if (!isAuthenticated || !user) {
    return (
      <Navigate 
        to={PUBLIC_ROUTES.LOGIN} 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  const userRole = user.role.toLowerCase() as UserRole;

  if (requiredRole && userRole !== requiredRole) {
    const redirectPath = getDefaultRoute(userRole);
    return <Navigate to={redirectPath} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    const redirectPath = getDefaultRoute(userRole);
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;