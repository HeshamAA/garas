import { useState, useEffect, useCallback } from 'react';
import { subscriptionApi } from '../api/subscriptionApi';
import { CreatePlanPayload, PlanQueryParams, SubscriptionPlan, UpdatePlanPayload } from '../types/subscription.types';
import { useToast } from '@/shared/hooks';
import { PaginationMetadata } from '@/shared/types/pagination.types';

const defaultPlanPayload: CreatePlanPayload = {
  name: '',
  description: '',
  price: 0,
  duration: 30,
  maxStudents: 0,
  maxDeliveryPersons: 0,
  features: [],
  isActive: true,
};

export const useSubscriptionPlans = () => {
  const toast = useToast();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [planFilters, setPlanFilters] = useState<PlanQueryParams>({ page: 1, limit: 6, sortOrder: 'ASC', isActive: true });
  const [pagination, setPagination] = useState<PaginationMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState<CreatePlanPayload>(defaultPlanPayload);
  const [featuresInput, setFeaturesInput] = useState('');
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [detailPlan, setDetailPlan] = useState<SubscriptionPlan | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editPlanId, setEditPlanId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<UpdatePlanPayload>({});
  const [editFeaturesInput, setEditFeaturesInput] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteState, setDeleteState] = useState<{ id: number | null; loading: boolean }>({ id: null, loading: false });

  const loadPlans = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await subscriptionApi.getPlans(planFilters);
      const items = Array.isArray(response.items) ? response.items : [];
      setPlans(items);
      setPagination(response.metadata ?? null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'حدث خطأ غير متوقع';
      toast.error(`تعذر تحميل الخطط: ${message}`);
    } finally {
      setIsLoading(false);
    }
  }, [planFilters, toast]);

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

  const handleInputChange = useCallback((key: keyof CreatePlanPayload, value: string | number | boolean) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const handleEditInputChange = useCallback((key: keyof UpdatePlanPayload, value: string | number | boolean) => {
    setEditValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const handleSubmitPlan = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      const payload: CreatePlanPayload = {
        ...formValues,
        price: Number(formValues.price),
        duration: Number(formValues.duration),
        maxStudents: Number(formValues.maxStudents),
        maxDeliveryPersons: Number(formValues.maxDeliveryPersons),
        features: featuresInput
          .split('\n')
          .map((feature) => feature.trim())
          .filter(Boolean),
      };

      await subscriptionApi.createPlan(payload);
      toast.success('تم إنشاء الخطة بنجاح');
      setFormValues(defaultPlanPayload);
      setFeaturesInput('');
      loadPlans();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'حدث خطأ أثناء حفظ البيانات';
      toast.error(`تعذر إنشاء الخطة: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  }, [formValues, featuresInput, loadPlans, toast]);

  const handleOpenDetail = useCallback(async (plan: SubscriptionPlan) => {
    setDetailDialogOpen(true);
    setDetailPlan(plan);
    setDetailLoading(true);
    try {
      const freshPlan = await subscriptionApi.getPlanById(plan.id);
      setDetailPlan(freshPlan);
    } catch (error) {
      setDetailDialogOpen(false);
      const message = error instanceof Error ? error.message : 'حدث خطأ غير متوقع';
      toast.error(`تعذر تحميل تفاصيل الخطة: ${message}`);
    } finally {
      setDetailLoading(false);
    }
  }, [toast]);

  const handleOpenEdit = useCallback(async (plan: SubscriptionPlan) => {
    setEditDialogOpen(true);
    setEditPlanId(plan.id);
    setIsUpdating(false);
    setDetailLoading(true);

    setEditValues({
      name: plan.name,
      description: plan.description,
      price: plan.price,
      duration: plan.duration,
      maxStudents: plan.maxStudents,
      maxDeliveryPersons: plan.maxDeliveryPersons,
      features: plan.features,
      isActive: plan.isActive,
    });
    setEditFeaturesInput(plan.features?.join('\n') ?? '');

    try {
      const freshPlan = await subscriptionApi.getPlanById(plan.id);
      setEditValues({
        name: freshPlan.name,
        description: freshPlan.description,
        price: freshPlan.price,
        duration: freshPlan.duration,
        maxStudents: freshPlan.maxStudents,
        maxDeliveryPersons: freshPlan.maxDeliveryPersons,
        features: freshPlan.features,
        isActive: freshPlan.isActive,
      });
      setEditFeaturesInput(freshPlan.features?.join('\n') ?? '');
    } catch (error) {
      setEditDialogOpen(false);
      const message = error instanceof Error ? error.message : 'حدث خطأ غير متوقع';
      toast.error(`تعذر تحميل بيانات الخطة: ${message}`);
    } finally {
      setDetailLoading(false);
    }
  }, [toast]);

  const handleUpdatePlan = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editPlanId) return;
    try {
      setIsUpdating(true);
      const payload: UpdatePlanPayload = {
        ...editValues,
        features: editFeaturesInput
          .split('\n')
          .map((feature) => feature.trim())
          .filter(Boolean),
      };
      await subscriptionApi.updatePlan(editPlanId, payload);
      toast.success('تم تحديث الخطة بنجاح');
      setEditDialogOpen(false);
      loadPlans();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'حدث خطأ أثناء التحديث';
      toast.error(`تعذر تحديث الخطة: ${message}`);
    } finally {
      setIsUpdating(false);
    }
  }, [editPlanId, editValues, editFeaturesInput, loadPlans, toast]);

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteState.id) return;
    try {
      setDeleteState((prev) => ({ ...prev, loading: true }));
      const response = await subscriptionApi.deletePlan(deleteState.id);
      toast.success(response.message || 'تم حذف الخطة بنجاح');
      setDeleteState({ id: null, loading: false });
      loadPlans();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'حدث خطأ أثناء الحذف';
      toast.error(`تعذر حذف الخطة: ${message}`);
      setDeleteState({ id: null, loading: false });
    }
  }, [deleteState.id, loadPlans, toast]);

  return {
    plans,
    planFilters,
    pagination,
    isLoading,
    isSubmitting,
    formValues,
    featuresInput,
    setFeaturesInput,
    detailDialogOpen,
    setDetailDialogOpen,
    detailPlan,
    detailLoading,
    editDialogOpen,
    setEditDialogOpen,
    editPlanId,
    editValues,
    editFeaturesInput,
    setEditFeaturesInput,
    isUpdating,
    deleteState,
    setDeleteState,
    handlePlanFilterChange,
    handleInputChange,
    handleEditInputChange,
    handleSubmitPlan,
    handleOpenDetail,
    handleOpenEdit,
    handleUpdatePlan,
    handleConfirmDelete,
  };
};
