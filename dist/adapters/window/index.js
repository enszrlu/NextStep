'use client';
export const useWindowAdapter = () => {
    console.debug('Navigation is not available, using window adapter! Some features may not work.');
    return {
        push: (path) => {
            window.history.pushState({}, '', path);
            window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
        },
        getCurrentPath: () => window.location.pathname,
    };
};
