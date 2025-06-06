'use client';
'use no memo';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback } from 'react';
// Example Hooks Usage:
// const { setCurrentStep, closeNextStep, startNextStep } = useNextStep();
// // To trigger a specific step
// setCurrentStep(2); // step 3
// // To close/start onboarding
// closeNextStep();
// startNextStep();
/**
 * Context for managing the state of the NextStep onboarding process.
 *
 * Provides methods to control the current step and visibility of the onboarding overlay.
 *
 * @returns {NextStepContextType} The context value containing state and methods for managing the onboarding process.
 *
 * @example
 * const { setCurrentStep, closeNextStep, startNextStep } = useNextStep();
 */
const NextStepContext = createContext(undefined);
/**
 * Custom hook to access the NextStep context.
 *
 * @throws Will throw an error if used outside of a NextStepProvider.
 * @returns {NextStepContextType} The context value containing state and methods for managing the onboarding process.
 */
const useNextStep = () => {
    const context = useContext(NextStepContext);
    if (context === undefined) {
        throw new Error('useNextStep must be used within a NextStepProvider');
    }
    return context;
};
/**
 * Provider component for the NextStep context.
 *
 * Manages the state of the current tour and step, and provides methods to control the onboarding process.
 *
 * @param {React.ReactNode} children - The child components that will have access to the NextStep context.
 * @returns {JSX.Element} The rendered provider component.
 */
const NextStepProvider = ({ children }) => {
    const [currentTour, setCurrentTour] = useState(null);
    const [currentStep, setCurrentStepState] = useState(0);
    const [isNextStepVisible, setNextStepVisible] = useState(false);
    const setCurrentStep = useCallback((step, delay) => {
        if (delay) {
            setTimeout(() => {
                setCurrentStepState(step);
                setNextStepVisible(true);
            }, delay);
        }
        else {
            setCurrentStepState(step);
            setNextStepVisible(true);
        }
    }, []);
    const closeNextStep = useCallback(() => {
        setNextStepVisible(false);
        setCurrentTour(null);
    }, []);
    const startNextStep = useCallback((tourName) => {
        setCurrentTour(tourName);
        setCurrentStepState(0);
        setNextStepVisible(true);
    }, []);
    return (_jsx(NextStepContext.Provider, { value: {
            currentTour,
            currentStep,
            setCurrentStep,
            closeNextStep,
            startNextStep,
            isNextStepVisible,
        }, children: children }));
};
export { NextStepProvider, useNextStep };
