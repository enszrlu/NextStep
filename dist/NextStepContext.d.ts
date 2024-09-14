import React from "react";
import { NextStepContextType } from "./types";
declare const useNextStep: () => NextStepContextType;
declare const NextStepProvider: React.FC<{
    children: React.ReactNode;
}>;
export { NextStepProvider, useNextStep };
