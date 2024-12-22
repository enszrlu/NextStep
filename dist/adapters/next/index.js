'use client';
import { useRouter, usePathname } from 'next/navigation';
export const useNextAdapter = () => {
    const router = useRouter();
    const pathname = usePathname();
    const isClient = typeof window !== 'undefined';
    return {
        push: (path) => {
            if (isClient) {
                console.log('BETA: pushing next adapter', path);
                router.push(path);
            }
        },
        getCurrentPath: () => (isClient ? pathname || '/' : '/'),
    };
};
