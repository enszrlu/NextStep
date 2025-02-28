'use client';

import type { NavigationAdapter } from '../../types/navigation';

export const useWindowAdapter = (): NavigationAdapter => {
  const isClient = typeof window !== 'undefined';

  console.debug(
    'Navigation is not available, using window adapter! Some features may not work.',
  );

  return {
    push: (path: string) => {
      if (isClient) {
        window.history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
      }
    },
    getCurrentPath: () => (isClient ? window.location.pathname : '/'),
  };
};
