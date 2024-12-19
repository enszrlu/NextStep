'use client';
import { useNavigate, useLocation } from 'react-router-dom';
export const createReactRouterAdapter = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return {
        push: (path) => {
            console.log('BETA: pushing react router adapter', path);
            navigate(path);
        },
        getCurrentPath: () => location.pathname,
    };
};
