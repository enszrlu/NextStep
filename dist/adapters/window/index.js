'use client';
export const useWindowAdapter = () => {
    const isClient = typeof window !== 'undefined';
    console.debug('Navigation is not available, using window adapter! Some features may not work.');
    return {
        push: (path) => {
            if (isClient) {
                window.history.pushState({}, '', path);
                window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
            }
        },
        getCurrentPath: () => (isClient ? window.location.pathname : '/'),
    };
};
