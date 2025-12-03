import { Users, UserCheck, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import type { SchoolStatistics } from '@/shared/types/statistics.types';
import type { StatCard } from '../types/dashboard.types';

export const mapStatisticsToCards = (statistics: SchoolStatistics | null): StatCard[] => {
  if (!statistics) return [];

  return [
    {
      title: 'إجمالي الطلاب',
      value: statistics.totalStudents.toString(),
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'أولياء الأمور',
      value: statistics.totalParents.toString(),
      icon: UserCheck,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'مستلمين',
      value: statistics.totalDeliveryPersons.toString(),
      icon: Truck,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'إجمالي الطلبات',
      value: statistics.totalRequests.toString(),
      icon: Clock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      title: 'طلبات معلقة',
      value: statistics.pendingRequestsToday.toString(),
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'تم التسليم اليوم',
      value: statistics.deliveredRequestsToday.toString(),
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'بانتظار الاستلام',
      value: statistics.waitingOutsideRequestsToday.toString(),
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'ملغاة اليوم',
      value: statistics.cancelledRequestsToday.toString(),
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
  ];
};
