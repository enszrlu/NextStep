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
const NextStepViewport = ({ children, id }: NextStepViewportProps) => {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        minHeight: '100%',
        minWidth: '100%',
      }}
      id={id}
    >
      {children}
    </div>
  );
};

export default NextStepViewport;
