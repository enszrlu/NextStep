'use client';
import { useRouter, usePathname } from 'next/navigation';
import type { NavigationAdapter } from '../../types/navigation';

export const useNextAdapter = (): NavigationAdapter => {
  const router = useRouter();
  const pathname = usePathname();

  return {
    push: (path: string) => {
      console.log('BETA: pushing next adapter', path);
      router.push(path);
    },
    getCurrentPath: () => pathname || '/',
  };
};
