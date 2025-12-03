import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PickupRequest } from '../types/request.types';

export const useRequestCard = (request: PickupRequest) => {
  const navigate = useNavigate();

  const formattedDate = useMemo(() => {
    return new Date(request.date).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }, [request.date]);

  const formattedTime = useMemo(() => {
    return new Date(request.date).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }, [request.date]);

  const howToReceiveLabel = useMemo(() => {
    if (!request.howToReceive) return 'غير محدد';
    switch (request.howToReceive) {
      case 'person':
        return 'شخصياً';
      case 'car':
        return 'بالسيارة';
      default:
        return 'أخرى';
    }
  }, [request.howToReceive]);

  const parentInitials = useMemo(() => {
    return (
      request.student.parent?.fullName
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2) || 'P'
    );
  }, [request.student.parent?.fullName]);

  const deliveryPersonInitials = useMemo(() => {
    return (
      request.deliveryPerson?.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2) || 'D'
    );
  }, [request.deliveryPerson?.fullName]);

  const studentClass = useMemo(() => {
    return typeof request.student.class === 'object'
      ? ((request.student.class as { name?: string })?.name || 'غير محدد')
      : request.student.class;
  }, [request.student.class]);

  const handleCardClick = useCallback(() => {
    navigate(`/receive-requests/${request.id}`);
  }, [navigate, request.id]);

  return {
    formattedDate,
    formattedTime,
    howToReceiveLabel,
    parentInitials,
    deliveryPersonInitials,
    studentClass,
    handleCardClick,
  };
};
