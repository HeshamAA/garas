import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/store/authSlice';
import studentsReducer from '@/features/school/students/store/studentsSlice';
import parentsReducer from '@/features/school/parents/store/parentsSlice';
import receiversReducer from '@/features/school/receivers/store/receiversSlice';
import requestsReducer from '@/features/school/pickup-requests/store/requestsSlice';
import schoolsReducer from '@/features/super-admin/schools/store/schoolsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
    parents: parentsReducer,
    receivers: receiversReducer,
    requests: requestsReducer,
    schools: schoolsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;