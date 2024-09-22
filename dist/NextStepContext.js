'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback } from 'react';
// Example Hooks Usage:
// const { setCurrentStep, closeNextStep, startNextStep } = useNextStep();
// // To trigger a specific step
// setCurrentStep(2); // step 3
// // To close/start onboarding
// closeNextStep();
// startNextStep();
const NextStepContext = createContext(undefined);
const useNextStep = () => {
    const context = useContext(NextStepContext);
    if (context === undefined) {
        throw new Error('useNextStep must be used within a NextStepProvider');
    }
    return context;
};
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
