import { Transition } from "framer-motion";

// Context
export interface NextStepContextType {
  currentStep: number;
  currentTour: string | null;
  setCurrentStep: (step: number, delay?: number) => void;
  closeNextStep: () => void;
  startNextStep: (tourName: string) => void;
  isNextStepVisible: boolean;
}


// Step
export interface Step {
  // Step Content
  icon: React.ReactNode | string | null;
  title: string;
  content: React.ReactNode;
  selector?: string;
  // Options
  side?: "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "left-top" | "left-bottom" | "right-top" | "right-bottom";
  showControls?: boolean;
  pointerPadding?: number;
  pointerRadius?: number;
  // Routing
  nextRoute?: string;
  prevRoute?: string;
}

// Tour
// 
export interface Tour {
  tour: string;
  steps: Step[];
}

// NextStep
export interface NextStepProps {
  children: React.ReactNode;
  steps: Tour[];
  showNextStep?: boolean;
  shadowRgb?: string;
  shadowOpacity?: string;
  cardTransition?: Transition;
  cardComponent?: React.ComponentType<CardComponentProps>;
  onStepChange?: (step: number) => void;
  onComplete?: () => void;
  onSkip?: () => void;
  displayArrow?: boolean;
}

// Custom Card
export interface CardComponentProps {
  step: Step;
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  skipTour?: () => void;
  arrow: JSX.Element;
}