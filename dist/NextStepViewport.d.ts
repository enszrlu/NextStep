import React from 'react';
interface NextStepViewportProps {
    children: React.ReactNode;
    id: string;
}
/**
 * A viewport component for wrapping content that will be targeted by the NextStep onboarding process.
 *
 * This component ensures that the content is positioned correctly and can be scrolled if necessary.
 *
 * @param {React.ReactNode} children - The content to be rendered within the viewport.
 * @param {string} id - The unique identifier for the viewport, used for targeting in the onboarding steps.
 * @returns {JSX.Element} The rendered viewport component.
 *
 * @example
 * <NextStepViewport id="scrollable-viewport">
 *   <YourScrollableContent />
 * </NextStepViewport>
 */
declare const NextStepViewport: ({ children, id }: NextStepViewportProps) => import("react/jsx-runtime").JSX.Element;
export default NextStepViewport;
