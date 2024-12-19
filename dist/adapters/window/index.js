'use client';
export const useWindowAdapter = () => {
    return {
        push: (path) => {
            window.history.pushState({}, '', path);
            window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
        },
        getCurrentPath: () => window.location.pathname,
    };
};
