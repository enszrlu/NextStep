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
                console.log('BETA: pushing react-router adapter', path);
                navigate(path);
            }
        },
        getCurrentPath: () => (isClient ? location.pathname : '/'),
    };
};
