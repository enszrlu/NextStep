'use client';

import { useRouter, usePathname } from 'next/navigation';
import type { NavigationAdapter } from '../../types/navigation';

export const useNextAdapter = (): NavigationAdapter => {
  const router = useRouter();
  const pathname = usePathname();
  const isClient = typeof window !== 'undefined';

  return {
    push: (path: string) => {
      if (isClient) {
        console.log('BETA: pushing next adapter', path);
        router.push(path);
      }
    },
    getCurrentPath: () => (isClient ? pathname || '/' : '/'),
  };
};
