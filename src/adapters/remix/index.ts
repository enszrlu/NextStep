'use client';

import { useNavigate, useLocation } from '@remix-run/react';
import type { NavigationAdapter } from '../../types/navigation';

export const useRemixAdapter = (): NavigationAdapter => {
  const navigate = useNavigate();
  const location = useLocation();
  const isClient = typeof window !== 'undefined';

  return {
    push: (path: string) => {
      if (isClient) {
        navigate(path);
      }
    },
    getCurrentPath: () => (isClient ? location.pathname : '/'),
  };
};
