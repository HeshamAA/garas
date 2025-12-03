import { PaymentMethod } from './subscription.types';

export interface PaymentMethodOption {
  label: string;
  value: PaymentMethod;
}

export const PAYMENT_METHODS: PaymentMethodOption[] = [
  { value: 'credit_card', label: 'بطاقة ائتمانية' },
  { value: 'bank_transfer', label: 'حوالة بنكية' },
  { value: 'cash', label: 'دفع نقدي' },
];
