import { Transition } from 'motion/react';
import { NavigationAdapter } from './navigation';

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
  icon?: React.ReactNode | string | null;
  title: string;
  content: React.ReactNode;
  selector?: string;
  // Options
  side?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'left-top'
    | 'left-bottom'
    | 'right-top'
    | 'right-bottom';
  showControls?: boolean;
  showSkip?: boolean;
  blockKeyboardControl?: boolean;
  pointerPadding?: number;
  pointerRadius?: number;
  disableInteraction?: boolean;
  /**
   * Gap in pixels between the tour card and the spotlight highlight.
   * The caret/arrow scales with this value too.
   * @default 25
   */
  cardOffset?: number;
  /**
   * Extra clearance in pixels kept above (and below) the target when it is
   * scrolled into view. Useful when a `position: fixed` / sticky header would
   * otherwise cover the highlighted element. Honors smooth scroll and nested
   * scroll containers (applied via `scroll-margin`).
   * @default 0
   */
  scrollOffset?: number;
  /**
   * Number of additional attempts to locate the `selector` element when it is
   * not present on the first lookup (useful for elements that render
   * asynchronously). `0` preserves the original behavior (a single lookup).
   * @default 0
   */
  selectorRetryAttempts?: number;
  /**
   * Delay in milliseconds between selector retry attempts.
   * @default 200
   */
  selectorRetryDelay?: number;
  // Routing
  nextRoute?: string;
  prevRoute?: string;
  // Dynamic Portal
  viewportID?: string;
}

// Tour
//
export interface Tour {
  tour: string;
  steps: Step[];
}

/**
 * A tour whose steps omit `showControls` / `showSkip`. These options only affect
 * the built-in `DefaultCard`, so they are meaningless when a custom
 * `cardComponent` renders its own controls. Used by {@link NextStepPropsWithCustomCard}.
 */
export interface TourWithCustomCard {
  tour: string;
  steps: Omit<Step, 'showControls' | 'showSkip'>[];
}

/** Props passed to a custom arrow component (see `arrowComponent`). */
export interface ArrowComponentProps {
  /** The resolved side the card is placed on (after any cut-off adjustment). */
  side: string;
  /** Computed positioning styles for the arrow; spread these onto your element. */
  style: React.CSSProperties;
}

// NextStep
/** Provider options shared by both the default-card and custom-card variants. */
interface NextStepCommonProps {
  children: React.ReactNode;
  showNextStep?: boolean;
  shadowRgb?: string;
  shadowOpacity?: string;
  cardTransition?: Transition;
  onStart?: (tourName: string | null) => void;
  onStepChange?: (step: number, tourName: string | null) => void;
  onComplete?: (tourName: string | null) => void;
  onSkip?: (step: number, tourName: string | null) => void;
  displayArrow?: boolean;
  clickThroughOverlay?: boolean;
  navigationAdapter?: () => NavigationAdapter;
  disableConsoleLogs?: boolean;
  scrollToTop?: boolean;
  noInViewScroll?: boolean;
  overlayZIndex?: number;
  /**
   * Render a fully custom arrow/caret. Receives the resolved `side` and the
   * computed positioning `style`. When omitted, the built-in SVG arrow is used.
   */
  arrowComponent?: React.ComponentType<ArrowComponentProps>;
  /**
   * Styles merged into the built-in arrow SVG (ignored when `arrowComponent`
   * is provided). Handy for tweaking the arrow color or size.
   */
  arrowStyle?: React.CSSProperties;
}

/** Provider props when using the built-in card (`showControls` / `showSkip` apply). */
export interface NextStepPropsWithDefaultCard extends NextStepCommonProps {
  steps: Tour[];
  cardComponent?: never;
}

/**
 * Provider props when a custom `cardComponent` is supplied. The custom card owns
 * its own controls, so `showControls` / `showSkip` are stripped from step types.
 */
export interface NextStepPropsWithCustomCard extends NextStepCommonProps {
  steps: TourWithCustomCard[];
  cardComponent: React.ComponentType<CardComponentProps>;
}

/**
 * Props for `NextStep` / `NextStepReact`. This is a discriminated union: when a
 * `cardComponent` is provided, TypeScript drops `showControls` / `showSkip` from
 * the step types (they only affect the built-in card). The runtime behavior is
 * unchanged — these options are simply ignored when a custom card is used.
 */
export type NextStepProps = NextStepPropsWithDefaultCard | NextStepPropsWithCustomCard;

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
