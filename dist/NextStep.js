'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import NextStepReact from './NextStepReact';
import { useNextAdapter } from './adapters/next';
/**
 * NextStep component for managing onboarding flow. It must be used within a NextStepProvider.
 *
 * This component provides a guided experience for users through a series of steps.
 * It allows customization of the card component and provides callbacks for various events.
 *
 * @param {React.ReactNode} children - The content to be displayed within the step.
 * @param {Array} steps - An array of steps to be displayed, each containing information for the onboarding process.
 * @param {string} [shadowRgb='0, 0, 0'] - The RGB value for the shadow effect surrounding the target area (default: '0, 0, 0').
 * @param {string} [shadowOpacity='0.2'] - The opacity of the shadow effect (default: '0.2').
 * @param {object} [cardTransition={ ease: 'anticipate', duration: 0.6 }] - Transition settings for the card animation, including easing and duration (default: { ease: 'anticipate', duration: 0.6 }).
 * @param {React.ComponentType} [cardComponent] - Custom component for rendering the card, allowing for design flexibility.
 * @param {function} [onStart] - Callback function triggered when the onboarding process starts (default: () => {}).
 * @param {function} [onStepChange] - Callback function triggered when the step changes, providing the current step index (default: () => {}).
 * @param {function} [onComplete] - Callback function triggered when the onboarding process is completed (default: () => {}).
 * @param {function} [onSkip] - Callback function triggered when the user skips the onboarding process (default: () => {}).
 * @param {boolean} [displayArrow=true] - Flag to display navigation arrows in the onboarding steps (default: true).
 * @param {boolean} [clickThroughOverlay=false] - Flag to enable click-through on the overlay, allowing interaction with underlying elements (default: false).
 * @param {function} [navigationAdapter=useNextAdapter] - Custom navigation adapter function for routing (default: useNextAdapter).
 * @param {boolean} [disableConsoleLogs=false] - Flag to disable console logs for debugging purposes (default: false).
 * @param {boolean} [scrollToTop=true] - Flag to scroll to the top of the page when the onboarding process ends (default: true).
 * @param {boolean} [noInViewScroll=false] - Flag to disable scrolling to the target element when it comes into view (default: false).
 *
 * @returns {JSX.Element} The rendered NextStep component.
 *
 */
const NextStep = ({ children, steps, shadowRgb = '0, 0, 0', shadowOpacity = '0.2', cardTransition = { ease: 'anticipate', duration: 0.6 }, cardComponent: CardComponent, onStart = () => { }, onStepChange = () => { }, onComplete = () => { }, onSkip = () => { }, displayArrow = true, clickThroughOverlay = false, navigationAdapter = useNextAdapter, disableConsoleLogs = false, scrollToTop = true, noInViewScroll = false, overlayZIndex = 999, }) => {
    return (_jsx(NextStepReact, { children: children, steps: steps, shadowRgb: shadowRgb, shadowOpacity: shadowOpacity, cardTransition: cardTransition, cardComponent: CardComponent, onStart: onStart, onStepChange: onStepChange, onComplete: onComplete, onSkip: onSkip, displayArrow: displayArrow, clickThroughOverlay: clickThroughOverlay, navigationAdapter: navigationAdapter, disableConsoleLogs: disableConsoleLogs, scrollToTop: scrollToTop, noInViewScroll: noInViewScroll, overlayZIndex: overlayZIndex }));
};
export default NextStep;
