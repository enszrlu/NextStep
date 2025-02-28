'use client';
'use no memo';
import { useNavigate, useLocation } from 'react-router';
export const useReactRouterAdapter = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isClient = typeof window !== 'undefined';
    return {
        push: (path) => {
            if (isClient) {
                navigate(path);
            }
        },
        getCurrentPath: () => (isClient ? location.pathname : '/'),
    };
};
