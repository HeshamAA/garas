import { useState, useEffect, useCallback } from 'react';
import { getLocalStorage, setLocalStorage, STORAGE_KEYS } from '@/shared/utils';

export const useSidebarState = (defaultOpen: boolean = true) => {
  const [isOpen, setIsOpen] = useState(() => {
    return getLocalStorage(STORAGE_KEYS.SIDEBAR_STATE, defaultOpen);
  });

  useEffect(() => {
    setLocalStorage(STORAGE_KEYS.SIDEBAR_STATE, isOpen);
  }, [isOpen]);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    toggle,
    open,
    close,
    setIsOpen,
  };
};
