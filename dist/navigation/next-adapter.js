'use client';
import { useRouter, usePathname } from 'next/navigation';
export const createNextAdapter = () => {
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
