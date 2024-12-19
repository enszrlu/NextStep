'use client';

import type { NavigationAdapter } from '../../types/navigation';

export const useWindowAdapter = (): NavigationAdapter => {
  console.debug(
    'Navigation is not available, using window adapter! Some features may not work.',
  );
  return {
    push: (path: string) => {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
    },
    getCurrentPath: () => window.location.pathname,
  };
};
