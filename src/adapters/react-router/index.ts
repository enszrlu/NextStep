'use client';
'use no memo';

import { useNavigate, useLocation } from 'react-router-dom';
import type { NavigationAdapter } from '../../types/navigation';

export const useReactRouterAdapter = (): NavigationAdapter => {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    push: (path: string) => {
      console.log('BETA: pushing react-router adapter', path);
      navigate(path);
    },
    getCurrentPath: () => location.pathname,
  };
};
