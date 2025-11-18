import { LucideIcon, TrendingUp, FileText, Users, UserCheck, Building2, Settings } from 'lucide-react';
import { SCHOOL_ROUTES, SUPER_ADMIN_ROUTES } from './routes';

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

export const SCHOOL_MENU_ITEMS: MenuItem[] = [
  { icon: TrendingUp, label: 'لوحة التحكم', path: SCHOOL_ROUTES.DASHBOARD },
  { icon: FileText, label: 'طلبات الاستلام', path: SCHOOL_ROUTES.RECEIVE_REQUESTS },
  { icon: Users, label: 'أولياء الأمور', path: SCHOOL_ROUTES.PARENTS },
  { icon: UserCheck, label: 'الطلاب', path: SCHOOL_ROUTES.STUDENTS },
  { icon: Users, label: 'المستلمون', path: SCHOOL_ROUTES.RECEIVERS },
];

export const SUPER_ADMIN_MENU_ITEMS: MenuItem[] = [
  { icon: TrendingUp, label: 'لوحة التحكم', path: SUPER_ADMIN_ROUTES.DASHBOARD },
  { icon: FileText, label: 'الطلبات', path: SUPER_ADMIN_ROUTES.REQUESTS },
  { icon: Building2, label: 'المدارس المسجلة', path: SUPER_ADMIN_ROUTES.SCHOOLS },
];

export const getMenuItemsByRole = (role: 'super_admin' | 'school' | null): MenuItem[] => {
  switch (role) {
    case 'super_admin':
      return SUPER_ADMIN_MENU_ITEMS;
    case 'school':
      return SCHOOL_MENU_ITEMS;
    default:
      return [];
  }
};
