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
        console.log('BETA: pushing remix adapter', path);
        navigate(path);
      }
    },
    getCurrentPath: () => (isClient ? location.pathname : '/'),
  };
};
