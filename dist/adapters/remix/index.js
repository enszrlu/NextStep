'use client';
import { useNavigate, useLocation } from '@remix-run/react';
export const useRemixAdapter = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isClient = typeof window !== 'undefined';
    return {
        push: (path) => {
            if (isClient) {
                console.log('BETA: pushing remix adapter', path);
                navigate(path);
            }
        },
        getCurrentPath: () => (isClient ? location.pathname : '/'),
    };
};
