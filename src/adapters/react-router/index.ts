'use client';
'use no memo';

import { useNavigate, useLocation } from 'react-router';
import type { NavigationAdapter } from '../../types/navigation';

export const useReactRouterAdapter = (): NavigationAdapter => {
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
