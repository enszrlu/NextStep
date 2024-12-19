'use client';
import { useRouter, usePathname } from 'next/navigation';
export const useNextAdapter = () => {
    const router = useRouter();
    const pathname = usePathname();
    return {
        push: (path) => {
            console.log('BETA: pushing next adapter', path);
            router.push(path);
        },
        getCurrentPath: () => pathname || '/',
    };
};
