'use client';

import { useNavigate, useLocation } from '@remix-run/react';
import type { NavigationAdapter } from '../types/navigation';

export const createRemixAdapter = (): NavigationAdapter => {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    push: (path: string) => {
      console.log('BETA: pushing remix adapter', path);
      navigate(path);
    },
    getCurrentPath: () => location.pathname,
  };
};
