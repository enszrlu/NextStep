'use client';
import { useNavigate, useLocation } from '@remix-run/react';
export const useRemixAdapter = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return {
        push: (path) => {
            console.log('BETA: pushing remix adapter', path);
            navigate(path);
        },
        getCurrentPath: () => location.pathname,
    };
};
