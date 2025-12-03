import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscriptionApi } from '../api/subscriptionApi';
import { PaymentMethod, PlanQueryParams, SubscriptionDetail, SubscriptionPlan } from '../types/subscription.types';
import { useToast, useAppDispatch } from '@/shared/hooks';
import { PaginationMetadata } from '@/shared/types/pagination.types';
import { logoutUser } from '@/features/auth/store/authThunks';
import { PUBLIC_ROUTES, SCHOOL_ROUTES } from '@/shared/constants/routes';

export const useSchoolSubscription = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [currentSubscription, setCurrentSubscription] = useState<SubscriptionDetail | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [planFilters, setPlanFilters] = useState<PlanQueryParams>({ isActive: true, page: 1, limit: 4, sortOrder: 'ASC' });
  const [plansPagination, setPlansPagination] = useState<PaginationMetadata | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState({ subscription: false, plans: false, subscribe: false });
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const loadCurrentSubscription = useCallback(async () => {
    try {
      setIsLoading((prev) => ({ ...prev, subscription: true }));
      const subscription = await subscriptionApi.getMySubscription();
      setCurrentSubscription(subscription);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'حدث خطأ غير متوقع';
      toast.error(`تعذر تحميل الاشتراك الحالي: ${message}`);
    } finally {
      setIsLoading((prev) => ({ ...prev, subscription: false }));
    }
  }, [toast]);

  const loadPlans = useCallback(async () => {
    try {
      setIsLoading((prev) => ({ ...prev, plans: true }));
      const response = await subscriptionApi.getPlans(planFilters);
      const items = Array.isArray(response.items) ? response.items : [];
      setPlans(items);
      setPlansPagination(response.metadata ?? null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'حدث خطأ غير متوقع';
      toast.error(`تعذر تحميل الخطط المتاحة: ${message}`);
    } finally {
      setIsLoading((prev) => ({ ...prev, plans: false }));
    }
  }, [planFilters, toast]);

  useEffect(() => {
    loadCurrentSubscription();
  }, []);

  useEffect(() => {
    loadPlans();
  }, [planFilters.page, planFilters.limit, planFilters.isActive, planFilters.sortOrder]);

  const handlePlanFilterChange = useCallback(<K extends keyof PlanQueryParams>(key: K, value: PlanQueryParams[K]) => {
    setPlanFilters((prev) => ({
      ...prev,
      [key]: value ?? undefined,
      page: key === 'page' ? value : 1,
    }));
  }, []);

  const handleSubscribe = useCallback(async () => {
    if (!selectedPlan) return;
    try {
      setIsLoading((prev) => ({ ...prev, subscribe: true }));
      await subscriptionApi.subscribe({
        planId: selectedPlan.id,
        paymentMethod,
      });
      toast.success(`تم الاشتراك بنجاح في خطة ${selectedPlan.name}`);
      setIsDialogOpen(false);
      setSelectedPlan(null);
      await loadCurrentSubscription();
      navigate(SCHOOL_ROUTES.DASHBOARD, { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'حدث خطأ أثناء تنفيذ الطلب';
      toast.error(`تعذر إتمام الاشتراك: ${message}`);
    } finally {
      setIsLoading((prev) => ({ ...prev, subscribe: false }));
    }
  }, [selectedPlan, paymentMethod, loadCurrentSubscription, navigate, toast]);

  const handleCancelSubscription = useCallback(async () => {
    if (!currentSubscription) return;
    try {
      setIsCancelling(true);
      await subscriptionApi.cancelSubscription(currentSubscription.id);
      toast.success('تم إلغاء الاشتراك بنجاح');
      setCancelDialogOpen(false);
      setCurrentSubscription(null);
      await dispatch(logoutUser());
      navigate(PUBLIC_ROUTES.LOGIN, { replace: true, state: { reason: 'subscriptionCancelled' } });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'حدث خطأ أثناء تنفيذ الطلب';
      toast.error(`تعذر إلغاء الاشتراك: ${message}`);
    } finally {
      setIsCancelling(false);
    }
  }, [currentSubscription, dispatch, navigate, toast]);

  const subscriptionEndsIn = useMemo(() => {
    if (!currentSubscription?.endDate) return null;
    const end = new Date(currentSubscription.endDate).getTime();
    const diff = end - Date.now();
    if (diff <= 0) return 'انتهى الاشتراك';
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `متبقي ${days} يوم`;
  }, [currentSubscription]);

  return {
    currentSubscription,
    plans,
    planFilters,
    plansPagination,
    selectedPlan,
    setSelectedPlan,
    paymentMethod,
    setPaymentMethod,
    isDialogOpen,
    setIsDialogOpen,
    isLoading,
    cancelDialogOpen,
    setCancelDialogOpen,
    isCancelling,
    subscriptionEndsIn,
    handlePlanFilterChange,
    handleSubscribe,
    handleCancelSubscription,
  };
};
