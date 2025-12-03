import { School, CheckCircle, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { SuperAdminStatistics } from '../types/dashboard.types';

export interface StatCard {
  title: string;
  value: string;
  icon: typeof School;
  color: string;
  bgColor: string;
}

export const mapStatisticsToCards = (statistics: SuperAdminStatistics | null): StatCard[] => {
  if (!statistics) return [];

  return [
    {
      title: 'إجمالي المدارس',
      value: (statistics.totalSchools ?? 0).toString(),
      icon: School,
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'المدارس النشطة',
      value: (statistics.activeSchools ?? 0).toString(),
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-500/10',
    },
    ...(statistics.suspendedSchools !== undefined ? [{
      title: 'مدارس محظورة',
      value: statistics.suspendedSchools.toString(),
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-500/10',
    }] : []),
    {
      title: 'مدارس معلقة',
      value: (statistics.pendingSchools ?? 0).toString(),
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'جديدة هذا الأسبوع',
      value: (statistics.newThisWeek ?? 0).toString(),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'جديدة هذا الشهر',
      value: (statistics.newThisMonth ?? 0).toString(),
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-500/10',
    },
  ];
};

export interface Alert {
  type: 'warning' | 'info';
  message: string;
}

export const mapStatisticsToAlerts = (statistics: SuperAdminStatistics | null): Alert[] => {
  if (!statistics) return [];

  const pendingSchools = statistics.pendingSchools ?? 0;
  const activatedToday = statistics.activatedToday ?? 0;

  return [
    ...(pendingSchools > 0 ? [{ type: 'warning' as const, message: `${pendingSchools} مدارس في انتظار الموافقة` }] : []),
    ...(activatedToday > 0 ? [{ type: 'info' as const, message: `تم تفعيل ${activatedToday} مدارس جديدة اليوم` }] : []),
  ];
};
