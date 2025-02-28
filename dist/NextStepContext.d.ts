import React from 'react';
import { NextStepContextType } from './types';
/**
 * Custom hook to access the NextStep context.
 *
 * @throws Will throw an error if used outside of a NextStepProvider.
 * @returns {NextStepContextType} The context value containing state and methods for managing the onboarding process.
 */
declare const useNextStep: () => NextStepContextType;
/**
 * Provider component for the NextStep context.
 *
 * Manages the state of the current tour and step, and provides methods to control the onboarding process.
 *
 * @param {React.ReactNode} children - The child components that will have access to the NextStep context.
 * @returns {JSX.Element} The rendered provider component.
 */
declare const NextStepProvider: React.FC<{
    children: React.ReactNode;
}>;
export { NextStepProvider, useNextStep };
