export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'خطأ في الاتصال بالإنترنت. يرجى التحقق من اتصالك والمحاولة مرة أخرى',
  UNAUTHORIZED: 'انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى',
  INVALID_CREDENTIALS: 'اسم المستخدم أو كلمة المرور غير صحيحة',
  SESSION_EXPIRED: 'انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى',
  FORBIDDEN: 'ليس لديك صلاحية للقيام بهذا الإجراء',
  ACCESS_DENIED: 'تم رفض الوصول. ليس لديك الصلاحيات المطلوبة',
  NOT_FOUND: 'المورد المطلوب غير موجود',
  RESOURCE_NOT_FOUND: 'لم يتم العثور على البيانات المطلوبة',
  VALIDATION_ERROR: 'خطأ في التحقق من البيانات. يرجى مراجعة المدخلات',
  INVALID_INPUT: 'البيانات المدخلة غير صحيحة',
  REQUIRED_FIELD: 'هذا الحقل مطلوب',
  RATE_LIMIT: 'تم تجاوز الحد المسموح من الطلبات. يرجى المحاولة لاحقاً',
  TOO_MANY_REQUESTS: 'عدد كبير جداً من الطلبات. يرجى الانتظار قليلاً',
  SERVER_ERROR: 'خطأ في الخادم. يرجى المحاولة لاحقاً',
  INTERNAL_ERROR: 'حدث خطأ داخلي. يرجى المحاولة مرة أخرى',
  SERVICE_UNAVAILABLE: 'الخدمة غير متاحة حالياً. يرجى المحاولة لاحقاً',
  UNKNOWN_ERROR: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى',
  SOMETHING_WENT_WRONG: 'حدث خطأ ما. يرجى المحاولة مرة أخرى',
  OPERATION_FAILED: 'فشلت العملية. يرجى المحاولة مرة أخرى',
  UPDATE_FAILED: 'فشل التحديث. يرجى المحاولة مرة أخرى',
  DELETE_FAILED: 'فشل الحذف. يرجى المحاولة مرة أخرى',
  CREATE_FAILED: 'فشل الإنشاء. يرجى المحاولة مرة أخرى',
  DATA_LOAD_FAILED: 'فشل تحميل البيانات. يرجى المحاولة مرة أخرى',
  DATA_SAVE_FAILED: 'فشل حفظ البيانات. يرجى المحاولة مرة أخرى',
} as const;

export const getErrorMessage = (code?: string): string => {
  if (!code) {
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  }

  return ERROR_MESSAGES[code as keyof typeof ERROR_MESSAGES] || ERROR_MESSAGES.UNKNOWN_ERROR;
};

export const formatError = (error: unknown): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }

  return ERROR_MESSAGES.UNKNOWN_ERROR;
};