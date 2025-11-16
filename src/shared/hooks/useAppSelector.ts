import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '@/shared/store/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;