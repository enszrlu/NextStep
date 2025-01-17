'use client';
'use no memo';

import { useNavigate, useLocation } from 'react-router-dom';
import type { NavigationAdapter } from '../../types/navigation';

export const useReactRouterAdapter = (): NavigationAdapter => {
  const navigate = useNavigate();
  const location = useLocation();
  const isClient = typeof window !== 'undefined';


  return {
    push: (path: string) => {
      if (isClient) {
      console.log('BETA: pushing react-router adapter', path);
      navigate(path);
      }
    },
    getCurrentPath: () => (isClient ? location.pathname : '/'),
  };
};
