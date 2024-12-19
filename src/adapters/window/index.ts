'use client';

import type { NavigationAdapter } from '../../types/navigation';

export const useWindowAdapter = (): NavigationAdapter => {
  return {
    push: (path: string) => {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
    },
    getCurrentPath: () => window.location.pathname,
  };
};
