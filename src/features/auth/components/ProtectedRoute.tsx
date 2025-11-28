import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/shared/hooks';
import { setUser, setToken } from '../store/authSlice';
import { restoreSession } from '../store/authThunks';
import { PUBLIC_ROUTES, SCHOOL_ROUTES, getDefaultRoute } from '@/shared/constants/routes';
import { UserRole } from '../types/auth.types';
import { subscriptionApi } from '@/features/subscription/api/subscriptionApi';

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
  const [subscriptionState, setSubscriptionState] = useState({
    isLoading: false,
    hasActiveSubscription: true,
  });

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

  useEffect(() => {
    let ignore = false;

    const checkSubscription = async () => {
      if (!isAuthenticated || !user || user.role.toLowerCase() !== 'school') {
        if (!ignore) {
          setSubscriptionState({
            isLoading: false,
            hasActiveSubscription: true,
          });
        }
        return;
      }

      setSubscriptionState((prev) => ({
        isLoading: true,
        hasActiveSubscription: prev.hasActiveSubscription,
      }));

      try {
        const subscription = await subscriptionApi.getMySubscription();
        if (!ignore) {
          setSubscriptionState({
            isLoading: false,
            hasActiveSubscription: Boolean(subscription && subscription.status === 'active'),
          });
        }
      } catch (error) {
        if (!ignore) {
          setSubscriptionState({
            isLoading: false,
            hasActiveSubscription: false,
          });
        }
      }
    };

    checkSubscription();

    return () => {
      ignore = true;
    };
  }, [isAuthenticated, user?.role, user?.id, location.pathname]);

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
  const isSchoolUser = userRole === 'school';
  const isOnSubscriptionPage = location.pathname === SCHOOL_ROUTES.SUBSCRIPTION;

  if (requiredRole && userRole !== requiredRole) {
    const redirectPath = getDefaultRoute(userRole);
    return <Navigate to={redirectPath} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    const redirectPath = getDefaultRoute(userRole);
    return <Navigate to={redirectPath} replace />;
  }

  if (isSchoolUser) {
    if (subscriptionState.isLoading) {
      return null;
    }

    if (!subscriptionState.hasActiveSubscription && !isOnSubscriptionPage) {
      return (
        <Navigate
          to={SCHOOL_ROUTES.SUBSCRIPTION}
          state={{ from: location.pathname }}
          replace
        />
      );
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;