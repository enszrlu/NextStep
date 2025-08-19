'use client';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNextStep } from './NextStepContext';
import { motion, useInView } from 'motion/react';
import { useWindowAdapter } from './adapters/window';

// Types
import { NextStepProps } from './types';
import DefaultCard from './DefaultCard';
import DynamicPortal from './DynamicPortal';
import SmoothSpotlight from './SmoothSpotlight';

/**
 * NextStepReact component for rendering the onboarding steps.
 *
 * This component handles the display of the onboarding steps, including the card and pointer.
 * It manages the visibility of the onboarding overlay and handles navigation between steps.
 *
 * @param {React.ReactNode} children - The content to be displayed within the onboarding context.
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
 * @param {function} [navigationAdapter=useWindowAdapter] - Custom navigation adapter function for routing (default: useWindowAdapter).
 * @param {boolean} [disableConsoleLogs=false] - Flag to disable console logs for debugging purposes (default: false).
 * @param {boolean} [scrollToTop=true] - Flag to scroll to the top of the page when the onboarding process ends (default: true).
 * @param {boolean} [noInViewScroll=false] - Flag to disable scrolling to the target element when it comes into view (default: false).
 *
 * @returns {JSX.Element} The rendered NextStepReact component.
 *
 * @example
 * <NextStepReact
 *   steps={steps}
 *   onStart={() => console.log('Tour started')}
 *   onComplete={() => console.log('Tour completed')}
 * >
 *   <YourAppContent />
 * </NextStepReact>
 */
const NextStepReact: React.FC<NextStepProps> = ({
  children,
  steps,
  shadowRgb = '0, 0, 0',
  shadowOpacity = '0.2',
  cardTransition = { ease: 'anticipate', duration: 0.6 },
  cardComponent: CardComponent,
  onStart = () => { },
  onStepChange = () => { },
  onComplete = () => { },
  onSkip = () => { },
  displayArrow = true,
  clickThroughOverlay = false,
  navigationAdapter = useWindowAdapter,
  disableConsoleLogs = false,
  scrollToTop = true,
  noInViewScroll = false,
}) => {
  const { currentTour, currentStep, setCurrentStep, isNextStepVisible, closeNextStep } =
    useNextStep();

  const currentTourSteps = steps.find((tour) => tour.tour === currentTour)?.steps;

  const [elementToScroll, setElementToScroll] = useState<Element | null>(null);
  const [pointerPosition, setPointerPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const currentElementRef = useRef<Element | null>(null);
  const observeRef = useRef(null); // Ref for the observer element
  const isInView = useInView(observeRef);
  const offset = 20;
  const [documentHeight, setDocumentHeight] = useState(0);
  const [viewport, setViewport] = useState<Element | null>(null);
  const [viewportRect, setViewportRect] = useState<DOMRect | null>(null);
  const [scrollableParent, setScrollableParent] = useState<Element | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const router = navigationAdapter();

  // - -
  // Handle pop state
  const handlePopState = useCallback(() => {
    closeNextStep();
  }, [closeNextStep]);

  // Add event listener for popstate
  useEffect(() => {
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handlePopState]);

  useEffect(() => {
    // This code will only run on the client side
    setViewport(window.document.body);
    setViewportRect(window.document.body.getBoundingClientRect());
    setScrollableParent(window.document.body);
  }, []);

  // - -
  // Route Changes
  const currentPath = router.getCurrentPath() || '/';

  // - -
  // On Start
  useEffect(() => {
    if (isNextStepVisible) {
      onStart?.(currentTour);
    }
  }, [currentTour, onStart, isNextStepVisible]);

  // - -
  // Clear validation error when step changes
  useEffect(() => {
    setValidationError(null);
    setIsValidating(false);
  }, [currentStep]);

  // - -
  // Initialize
  useEffect(() => {
    if (isNextStepVisible && currentTourSteps) {
      if (!disableConsoleLogs) {
        console.log('NextStep: Current Step Changed');
      }

      const step = currentTourSteps[currentStep];

      // Default viewport is the body
      let tempViewport: Element = window.document.body;

      if (step) {
        if (step.viewportID) {
          const stepViewport = document.querySelector(`#${step.viewportID}`);
          if (stepViewport) {
            tempViewport = stepViewport;
          }
        }
      }
      const tempViewportRect = tempViewport.getBoundingClientRect();
      setViewport(tempViewport);
      setViewportRect(tempViewportRect);
      setScrollableParent(getScrollableParent(tempViewport));

      if (step && step.selector) {
        const element = document.querySelector(step.selector) as Element | null;
        if (element) {
          setPointerPosition(getElementPosition(element));
          currentElementRef.current = element;
          setElementToScroll(element);

          const rect = element.getBoundingClientRect();
          const isInViewportWithOffset =
            rect.top >= -offset && rect.bottom <= window.innerHeight + offset;

          if (!isInViewportWithOffset) {
            const side = checkSideCutOff(
              currentTourSteps?.[currentStep]?.side || 'right',
            );
            element.scrollIntoView({
              behavior: 'smooth',
              block: side.includes('top')
                ? 'end'
                : side.includes('bottom')
                  ? 'start'
                  : 'center',
            });
          }
        }
      } else {
        // Reset pointer position to middle of the screen when selector is empty, undefined, or ""
        if (step.viewportID) {
          setPointerPosition({
            x: getScrollableParent(tempViewport).getBoundingClientRect().width / 2,
            y: getScrollableParent(tempViewport).getBoundingClientRect().height / 2,
            width: 0,
            height: 0,
          });
        } else {
          setPointerPosition({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            width: 0,
            height: 0,
          });
        }

        currentElementRef.current = null;
        setElementToScroll(null);
      }
    }
  }, [currentStep, currentTourSteps, isInView, offset, isNextStepVisible]);

  // - -
  // Update viewport rect
  const updateViewportRect = () => {
    // Default viewport is the body
    let tempViewport: Element | null = window.document.body;

    if (currentTourSteps && currentStep !== undefined) {
      const step = currentTourSteps[currentStep];
      if (step.viewportID) {
        // If the step has a viewportID, use the wrapper as the viewport
        const stepViewport = document.querySelector(`#${step.viewportID}`);
        if (stepViewport) {
          tempViewport = stepViewport;
        }
      }
    }
    setViewport(tempViewport);
    setViewportRect(tempViewport.getBoundingClientRect());
    setScrollableParent(getScrollableParent(tempViewport));
  };

  // - -
  // Update viewport rect on window resize and path change
  useEffect(() => {
    if (isNextStepVisible) {
      // Call the updateViewportRect function initially when currentStep changes
      updateViewportRect();

      // Set up a resize event listener to update viewport rect on window resize
      window.addEventListener('resize', updateViewportRect);

      // Clean up the event listener on unmount
      return () => {
        window.removeEventListener('resize', updateViewportRect);
      };
    }
  }, [currentStep, currentPath, currentTourSteps, isNextStepVisible]);

  // - -
  // Helper function to get element position
  const getElementPosition = (element: Element) => {
    const elementRect = element.getBoundingClientRect();

    // Default viewport is the body
    let viewport: Element | null = window.document.body;
    let viewPortRect: DOMRect | null = window.document.body.getBoundingClientRect();

    if (currentTourSteps && currentStep !== undefined) {
      const step = currentTourSteps[currentStep];
      if (step.viewportID) {
        // If the step has a viewportID, use the wrapper as the viewport
        const tempViewport = document.querySelector(`#${step.viewportID}`);
        if (tempViewport) {
          viewport = tempViewport;
          viewPortRect = viewport.getBoundingClientRect();
        }
      }
    }

    // Calculate the position of the element relative to the viewport
    const relativeTop = elementRect.top - viewPortRect.top + viewport.scrollTop;
    const relativeLeft = elementRect.left - viewPortRect.left + viewport.scrollLeft;

    return {
      x: relativeLeft,
      y: relativeTop,
      width: elementRect.width,
      height: elementRect.height,
    };
  };

  // - -
  // Update pointerPosition when currentStep changes
  useEffect(() => {
    if (isNextStepVisible && currentTourSteps) {
      if (!disableConsoleLogs) {
        console.log('NextStep: Current Step Changed');
      }
      const step = currentTourSteps[currentStep];

      // Default viewport is the body
      let tempViewport: Element | null = window.document.body;

      if (step) {
        if (step.viewportID) {
          // If the step has a viewportID, use the wrapper as the viewport
          const viewport = document.querySelector(`#${step.viewportID}`);
          if (viewport) {
            tempViewport = viewport;
          }
        }
      }

      const tempViewportRect = tempViewport.getBoundingClientRect();
      setViewport(tempViewport);
      setViewportRect(tempViewportRect);
      setScrollableParent(getScrollableParent(tempViewport));

      if (step && step.selector) {
        const element = document.querySelector(step.selector) as Element | null;
        if (element) {
          setPointerPosition(getElementPosition(element));
          currentElementRef.current = element;
          setElementToScroll(element);

          const rect = element.getBoundingClientRect();
          const isInViewportWithOffset =
            rect.top >= -offset && rect.bottom <= window.innerHeight + offset;

          if (!isInViewportWithOffset) {
            const side = checkSideCutOff(
              currentTourSteps?.[currentStep]?.side || 'right',
            );
            element.scrollIntoView({
              behavior: 'smooth',
              block: side.includes('top')
                ? 'end'
                : side.includes('bottom')
                  ? 'start'
                  : 'center',
            });
          }
        }
      } else {
        // Reset pointer position to middle of the screen when selector is empty, undefined, or ""
        if (step.viewportID) {
          setPointerPosition({
            x: getScrollableParent(tempViewport).getBoundingClientRect().width / 2,
            y: getScrollableParent(tempViewport).getBoundingClientRect().height / 2,
            width: 0,
            height: 0,
          });
        } else {
          setPointerPosition({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            width: 0,
            height: 0,
          });
        }

        currentElementRef.current = null;
        setElementToScroll(null);
      }
    }
  }, [currentStep, currentTourSteps, isInView, offset, isNextStepVisible]);

  useEffect(() => {
    if (elementToScroll && !isInView && isNextStepVisible) {
      if (!disableConsoleLogs) {
        console.log('NextStep: Element to Scroll Changed');
      }

      const side = checkSideCutOff(currentTourSteps?.[currentStep]?.side || 'right');
      if (!noInViewScroll) {
        elementToScroll.scrollIntoView({
          behavior: 'smooth',
          block: side.includes('top')
            ? 'end'
            : side.includes('bottom')
              ? 'start'
              : 'center',
          inline: 'center',
        });
      }
    } else {
      if (scrollToTop || !elementToScroll) {
        // Scroll to the top of the body
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [elementToScroll, isInView, isNextStepVisible]);

  // - -
  // Update pointer position on window resize
  const updatePointerPosition = () => {
    if (currentTourSteps) {
      const step = currentTourSteps[currentStep];
      if (step && step.selector) {
        const element = document.querySelector(step.selector) as Element | null;
        if (element) {
          setPointerPosition(getElementPosition(element));
        }
      } else {
        // Reset pointer position to middle of the screen when selector is empty, undefined, or ""
        const stepViewport = document.querySelector(`#${step.viewportID}`);

        if (step.viewportID && stepViewport && scrollableParent) {
          setPointerPosition({
            x: getScrollableParent(stepViewport).getBoundingClientRect().width / 2,
            y: scrollableParent.getBoundingClientRect().height / 2,
            width: 0,
            height: 0,
          });
        } else {
          setPointerPosition({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            width: 0,
            height: 0,
          });
        }

        currentElementRef.current = null;
        setElementToScroll(null);
      }
    }
  };

  // - -
  // Update pointer position on window resize
  useEffect(() => {
    if (isNextStepVisible) {
      window.addEventListener('resize', updatePointerPosition);
      return () => window.removeEventListener('resize', updatePointerPosition);
    }
  }, [currentStep, currentTourSteps, isNextStepVisible]);

  // - -
  // Update document height on window resize
  useEffect(() => {
    const updateDocumentHeight = () => {
      const height = Math.max(
        document.body.scrollHeight,
        // document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
      );
      setDocumentHeight(height);
    };

    updateDocumentHeight();
    window.addEventListener('resize', updateDocumentHeight);
    return () => window.removeEventListener('resize', updateDocumentHeight);
  }, []);

  // Observe selector changes and update pointer position
  useEffect(() => {
    if (!isNextStepVisible || !currentTour) return;

    if (!currentTourSteps || currentStep === undefined) return;

    const step = currentTourSteps[currentStep];

    if (!step.selector) return;

    const targetElement = document.querySelector(step.selector);

    if (!targetElement) return;

    const resizeObserver = new ResizeObserver(() => {
      updatePointerPosition();
      updateViewportRect();
    });

    resizeObserver.observe(targetElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [currentStep, currentTour]);

  // - -
  // Validation Helper
  const validateCurrentStep = async (): Promise<boolean> => {
    if (!currentTourSteps || currentStep === undefined) return true;

    const currentStepData = currentTourSteps[currentStep];
    if (!currentStepData.validation) return true;

    setIsValidating(true);
    setValidationError(null);

    try {
      const isValid = await currentStepData.validation.validate();

      if (!isValid) {
        setValidationError(currentStepData.validation.errorMessage || 'Ação necessária não foi executada');
        return false;
      }

      return true;
    } catch (error) {
      setValidationError('Erro durante a validação');
      if (!disableConsoleLogs) {
        console.error('Validation error:', error);
      }
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  // - -
  // Step Controls
  const nextStep = async () => {
    // Validate current step before proceeding
    const isValid = await validateCurrentStep();
    if (!isValid) {
      return; // Stop if validation fails
    }

    if (currentTourSteps && currentStep < currentTourSteps.length - 1) {
      try {
        const nextStepIndex = currentStep + 1;
        const route = currentTourSteps[currentStep].nextRoute;

        onStepChange?.(nextStepIndex, currentTour);

        if (route) {
          router.push(route);

          const targetSelector = currentTourSteps[nextStepIndex].selector;

          if (targetSelector) {
            // Use MutationObserver to detect when the target element is available in the DOM
            const observer = new MutationObserver((mutations, observer) => {
              const element = document.querySelector(targetSelector);
              if (element) {
                // Once the element is found, update the step and scroll to the element
                setCurrentStep(nextStepIndex);
                scrollToElement(nextStepIndex);

                // Stop observing after the element is found
                observer.disconnect();
              }
            });

            // Start observing the document body for changes
            observer.observe(document.body, {
              childList: true,
              subtree: true,
            });
          } else {
            setCurrentStep(nextStepIndex);
          }
        } else {
          setCurrentStep(nextStepIndex);
          scrollToElement(nextStepIndex);
        }
      } catch (error) {
        if (!disableConsoleLogs) {
          console.error('Error navigating to next route', error);
        }
      }
    } else if (currentTourSteps && currentStep === currentTourSteps.length - 1) {
      onComplete?.(currentTour);
      closeNextStep();
    }
  };

  const prevStep = () => {
    if (currentTourSteps && currentStep > 0) {
      try {
        const prevStepIndex = currentStep - 1;
        const route = currentTourSteps[currentStep].prevRoute;

        onStepChange?.(prevStepIndex, currentTour);

        if (route) {
          router.push(route);

          const targetSelector = currentTourSteps[prevStepIndex].selector;

          if (targetSelector) {
            // Use MutationObserver to detect when the target element is available in the DOM
            const observer = new MutationObserver((mutations, observer) => {
              const element = document.querySelector(targetSelector);
              if (element) {
                // Once the element is found, update the step and scroll to the element
                setCurrentStep(prevStepIndex);
                scrollToElement(prevStepIndex);

                // Stop observing after the element is found
                observer.disconnect();
              }
            });

            // Start observing the document body for changes
            observer.observe(document.body, {
              childList: true,
              subtree: true,
            });
          } else {
            setCurrentStep(prevStepIndex);
          }
        } else {
          setCurrentStep(prevStepIndex);
          scrollToElement(prevStepIndex);
        }
      } catch (error) {
        if (!disableConsoleLogs) {
          console.error('Error navigating to previous route', error);
        }
      }
    }
  };

  // - -
  // Skip Tour
  const skipTour = () => {
    onSkip?.(currentStep, currentTour);
    closeNextStep();
  };

  // - -
  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isNextStepVisible && !currentTourSteps?.[currentStep]?.blockKeyboardControl) {
        switch (event.key) {
          case 'ArrowRight':
            nextStep();
            break;
          case 'ArrowLeft':
            prevStep();
            break;
          case 'Escape':
            skipTour();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isNextStepVisible, nextStep, prevStep, skipTour]);

  // - -
  // Scroll to the correct element when the step changes
  const scrollToElement = (stepIndex: number) => {
    if (currentTourSteps) {
      const selector = currentTourSteps[stepIndex].selector;
      if (selector) {
        const element = document.querySelector(selector) as Element | null;
        if (element) {
          const { top } = element.getBoundingClientRect();
          const isInViewport = top >= -offset && top <= window.innerHeight + offset;
          if (!isInViewport) {
            const side = checkSideCutOff(currentTourSteps?.[stepIndex]?.side || 'right');
            element.scrollIntoView({
              behavior: 'smooth',
              block: side.includes('top')
                ? 'end'
                : side.includes('bottom')
                  ? 'start'
                  : 'center',
            });
          }
          // Update pointer position after scrolling
          setPointerPosition(getElementPosition(element));
        }
      } else {
        // Reset pointer position to middle of the screen when selector is empty, undefined, or ""
        if (currentTourSteps?.[currentStep].viewportID && scrollableParent) {
          setPointerPosition({
            x: scrollableParent.getBoundingClientRect().width / 2,
            y: scrollableParent.getBoundingClientRect().height / 2,
            width: 0,
            height: 0,
          });
        } else {
          setPointerPosition({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            width: 0,
            height: 0,
          });
        }

        currentElementRef.current = null;
        setElementToScroll(null);
      }
    }
  };

  // - -
  // Check if Card is Cut Off on Sides
  const checkSideCutOff = (side: string) => {
    if (!side) {
      return side;
    }

    if (!viewport) {
      return side;
    }

    let tempSide = side;

    let removeSide = false;

    // Check if card would be cut off on sides
    if (
      side.startsWith('right') &&
      pointerPosition &&
      viewport.scrollWidth < pointerPosition.x + pointerPosition.width + 256
    ) {
      removeSide = true;
    } else if (side.startsWith('left') && pointerPosition && pointerPosition.x < 256) {
      removeSide = true;
    }

    // Check if card would be cut off on top or bottom
    if (side.includes('top') && pointerPosition && pointerPosition.y < 256) {
      if (removeSide) {
        tempSide = 'bottom';
      } else {
        tempSide = side.replace('top', 'bottom');
      }
    } else if (
      side.includes('bottom') &&
      pointerPosition &&
      pointerPosition.y + pointerPosition.height + 256 > viewport.scrollHeight
    ) {
      if (removeSide) {
        tempSide = 'top';
      } else {
        tempSide = side.replace('bottom', 'top');
      }
    } else if (removeSide) {
      tempSide = pointerPosition && pointerPosition.y < 256 ? 'bottom' : 'top';
    }

    return tempSide;
  };

  // - -
  // Card Side
  const getCardStyle = (side: string): React.CSSProperties => {
    if (!side || !currentTourSteps?.[currentStep].selector) {
      // Center the card if the selector is undefined or empty
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // Center the card
        position: 'fixed', // Make sure it's positioned relative to the viewport
        margin: '0',
      };
    }

    side = checkSideCutOff(side);

    switch (side) {
      case 'top':
        return {
          transform: `translate(-50%, 0)`,
          left: '50%',
          bottom: '100%',
          marginBottom: '25px',
        };
      case 'bottom':
        return {
          transform: `translate(-50%, 0)`,
          left: '50%',
          top: '100%',
          marginTop: '25px',
        };
      case 'left':
        return {
          transform: `translate(0, -50%)`,
          right: '100%',
          top: '50%',
          marginRight: '25px',
        };
      case 'right':
        return {
          transform: `translate(0, -50%)`,
          left: '100%',
          top: '50%',
          marginLeft: '25px',
        };
      case 'top-left':
        return {
          bottom: '100%',
          marginBottom: '25px',
        };
      case 'top-right':
        return {
          right: 0,
          bottom: '100%',
          marginBottom: '25px',
        };
      case 'bottom-left':
        return {
          top: '100%',
          marginTop: '25px',
        };
      case 'bottom-right':
        return {
          right: 0,
          top: '100%',
          marginTop: '25px',
        };
      case 'right-bottom':
        return {
          left: '100%',
          bottom: 0,
          marginLeft: '25px',
        };
      case 'right-top':
        return {
          left: '100%',
          top: 0,
          marginLeft: '25px',
        };
      case 'left-bottom':
        return {
          right: '100%',
          bottom: 0,
          marginRight: '25px',
        };
      case 'left-top':
        return {
          right: '100%',
          top: 0,
          marginRight: '25px',
        };
      default:
        return {}; // Default case if no side is specified
    }
  };

  // - -
  // Arrow position based on card side
  const getArrowStyle = (side: string) => {
    side = checkSideCutOff(side);

    switch (side) {
      case 'bottom':
        return {
          transform: `translate(-50%, 0) rotate(270deg)`,
          left: '50%',
          top: '-23px',
        };
      case 'top':
        return {
          transform: `translate(-50%, 0) rotate(90deg)`,
          left: '50%',
          bottom: '-23px',
        };
      case 'right':
        return {
          transform: `translate(0, -50%) rotate(180deg)`,
          top: '50%',
          left: '-23px',
        };
      case 'left':
        return {
          transform: `translate(0, -50%) rotate(0deg)`,
          top: '50%',
          right: '-23px',
        };
      case 'top-left':
        return {
          transform: `rotate(90deg)`,
          left: '10px',
          bottom: '-23px',
        };
      case 'top-right':
        return {
          transform: `rotate(90deg)`,
          right: '10px',
          bottom: '-23px',
        };
      case 'bottom-left':
        return {
          transform: `rotate(270deg)`,
          left: '10px',
          top: '-23px',
        };
      case 'bottom-right':
        return {
          transform: `rotate(270deg)`,
          right: '10px',
          top: '-23px',
        };
      case 'right-bottom':
        return {
          transform: `rotate(180deg)`,
          left: '-23px',
          bottom: '10px',
        };
      case 'right-top':
        return {
          transform: `rotate(180deg)`,
          left: '-23px',
          top: '10px',
        };
      case 'left-bottom':
        return {
          transform: `rotate(0deg)`,
          right: '-23px',
          bottom: '10px',
        };
      case 'left-top':
        return {
          transform: `rotate(0deg)`,
          right: '-23px',
          top: '10px',
        };
      default:
        return {
          display: 'none',
        }; // Default case if no side is specified
    }
  };

  // - -
  // Card Arrow
  const CardArrow = ({ isVisible }: { isVisible: boolean }) => {
    if (!isVisible) {
      return null;
    }
    return (
      <svg
        viewBox="0 0 54 54"
        data-name="nextstep-arrow"
        style={{
          ...getArrowStyle(currentTourSteps?.[currentStep]?.side as any),
          position: 'absolute',
          width: '1.5rem',
          height: '1.5rem',
          transformOrigin: 'center',
        }}
      >
        <path id="triangle" d="M27 27L0 0V54L27 27Z" fill="currentColor" />
      </svg>
    );
  };

  // - -
  // Overlay Variants
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  // - -
  // Pointer Options
  const pointerPadding = currentTourSteps?.[currentStep]?.pointerPadding ?? 30;
  const pointerPadOffset = pointerPadding / 2;
  const pointerRadius = currentTourSteps?.[currentStep]?.pointerRadius ?? 28;

  // Check if viewport is scrollable
  const isViewportScrollable = viewport ? isElementScrollable(viewport) : false;

  // Handle navigation when no adapter is provided
  const handleNavigation = useCallback((path: string) => {
    console.warn(
      'No navigation adapter provided. Please provide a navigation adapter or import one from nextstepjs/adapters/*',
    );
  }, []);

  // Use a fallback adapter when none is provided
  const effectiveAdapter = useMemo(
    () =>
      navigationAdapter || {
        push: handleNavigation,
        getCurrentPath: () => '/',
      },
    [navigationAdapter, handleNavigation],
  );

  return (
    <div
      data-name="nextstep-wrapper"
      data-nextstep="dev"
      style={{ position: 'relative', width: '100%' }}
    >
      {/* Container for the Website content */}
      <div data-name="nextstep-site" style={{ display: 'block', width: '100%' }}>
        {children}
      </div>

      {/* NextStep Overlay Step Content */}
      {pointerPosition && isNextStepVisible && viewport && (
        <DynamicPortal viewportID={currentTourSteps?.[currentStep]?.viewportID}>
          <motion.div
            data-name="nextstep-overlay"
            initial="hidden"
            animate={isNextStepVisible ? 'visible' : 'hidden'}
            variants={variants}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              overflow: 'hidden',
              height: isViewportScrollable ? `${viewport.scrollHeight}px` : '100%',
              width: isViewportScrollable ? `${viewport.scrollWidth}px` : '100%',
              zIndex: 997, // Ensure it's below the pointer but above other content
              pointerEvents: 'none',
            }}
          >
            {/* Top Right Bottom Left Overlay around the pointer to prevent clicks */}
            {!clickThroughOverlay && viewportRect && (
              <div
                data-name="nextstep-prevent-click-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 998,
                  pointerEvents: 'none',
                  height: `${viewport.scrollHeight}px`,
                  width: `${viewport.scrollWidth}px`,
                }}
              >
                {/* Top overlay */}
                <div
                  data-name="nextstep-prevent-click-overlay-top"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    pointerEvents: 'auto',
                    height: Math.max(pointerPosition.y - pointerPadOffset, 0),
                  }}
                ></div>

                {/* Bottom overlay */}
                <div
                  data-name="nextstep-prevent-click-overlay-bottom"
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'auto',
                    height: `${Math.max(
                      viewportRect.height -
                      (pointerPosition.y + pointerPosition.height + pointerPadOffset),
                      0,
                    )}px`,
                  }}
                ></div>

                {/* Left overlay */}
                <div
                  data-name="nextstep-prevent-click-overlay-left"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    pointerEvents: 'auto',
                    width: Math.max(pointerPosition.x - pointerPadOffset, 0),
                    height: viewportRect.height,
                  }}
                ></div>

                {/* Right overlay */}
                <div
                  data-name="nextstep-prevent-click-overlay-right"
                  style={{
                    position: 'absolute',
                    top: 0,
                    pointerEvents: 'auto',
                    left: `${pointerPosition.x + pointerPosition.width + pointerPadOffset
                      }px`,
                    right: 0,
                    height: viewportRect.height,
                  }}
                ></div>
              </div>
            )}

            <SmoothSpotlight
              x={pointerPosition.x - pointerPadOffset}
              y={pointerPosition.y - pointerPadOffset}
              width={pointerPosition.width + pointerPadding}
              height={pointerPosition.height + pointerPadding}
              padding={pointerPadding}
              radius={pointerRadius}
              shadowOpacity={shadowOpacity}
              shadowRgb={shadowRgb}
            />
            {/* Pointer */}
            <motion.div
              data-name="nextstep-pointer"
              style={{
                position: 'relative',
                zIndex: 999,
                borderRadius: `${pointerRadius}px ${pointerRadius}px ${pointerRadius}px ${pointerRadius}px`,
                pointerEvents: 'none',
              }}
              initial={
                pointerPosition
                  ? {
                    x: pointerPosition.x - pointerPadOffset,
                    y: pointerPosition.y - pointerPadOffset,
                    width: pointerPosition.width + pointerPadding,
                    height: pointerPosition.height + pointerPadding,
                  }
                  : {}
              }
              animate={
                pointerPosition
                  ? {
                    x: pointerPosition.x - pointerPadOffset,
                    y: pointerPosition.y - pointerPadOffset,
                    width: pointerPosition.width + pointerPadding,
                    height: pointerPosition.height + pointerPadding,
                  }
                  : {}
              }
              transition={cardTransition}
            >
              {/* Card */}
              <motion.div
                data-name="nextstep-card"
                transition={cardTransition}
                style={{
                  ...getCardStyle(currentTourSteps?.[currentStep]?.side as any),
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: '100%',
                  minWidth: 'min-content',
                  pointerEvents: 'auto',
                  zIndex: 999,
                }}
              >
                {CardComponent ? (
                  <CardComponent
                    step={currentTourSteps?.[currentStep]!}
                    currentStep={currentStep}
                    totalSteps={currentTourSteps?.length ?? 0}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    arrow={
                      <CardArrow
                        isVisible={
                          !!(currentTourSteps?.[currentStep]?.selector && displayArrow)
                        }
                      />
                    }
                    skipTour={skipTour}
                    validationError={validationError}
                    isValidating={isValidating}
                  />
                ) : (
                  <DefaultCard
                    step={currentTourSteps?.[currentStep]!}
                    currentStep={currentStep}
                    totalSteps={currentTourSteps?.length ?? 0}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    arrow={
                      <CardArrow
                        isVisible={
                          !!(currentTourSteps?.[currentStep]?.selector && displayArrow)
                        }
                      />
                    }
                    skipTour={skipTour}
                    validationError={validationError}
                    isValidating={isValidating}
                  />
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </DynamicPortal>
      )}

      {/* NextStep Overlay for Outside of Custom Wrapper only when viewportID is available */}
      {pointerPosition &&
        isNextStepVisible &&
        currentTourSteps?.[currentStep]?.viewportID &&
        scrollableParent && (
          <DynamicPortal>
            <motion.div
              data-name="nextstep-overlay2"
              initial="hidden"
              animate={isNextStepVisible ? 'visible' : 'hidden'}
              variants={variants}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                overflow: 'hidden',
                height: `${documentHeight}px`,
                width: `${document.body.scrollWidth}px`,
                zIndex: 997,
                pointerEvents: 'none',
              }}
            >
              {/* Top Right Bottom Left Overlay around the pointer to prevent clicks */}
              {!clickThroughOverlay && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 998,
                    pointerEvents: 'none',
                    width: '100vw',
                    height: documentHeight,
                  }}
                >
                  {/* Top overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      pointerEvents: 'auto',
                      height:
                        scrollableParent.getBoundingClientRect().top + window.scrollY,
                      width: `${document.body.scrollWidth}px`,
                      backgroundColor: `rgba(${shadowRgb}, ${shadowOpacity})`,
                    }}
                  ></div>

                  {/* Bottom overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      pointerEvents: 'auto',
                      top: `${scrollableParent.getBoundingClientRect().bottom + window.scrollY
                        }px`,
                      height: `${documentHeight -
                        scrollableParent.getBoundingClientRect().bottom -
                        window.scrollY
                        }px`,
                      width: `${document.body.scrollWidth}px`,
                      backgroundColor: `rgba(${shadowRgb}, ${shadowOpacity})`,
                    }}
                  ></div>

                  {/* Left overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      pointerEvents: 'auto',
                      left: '0',
                      top: scrollableParent.getBoundingClientRect().top + window.scrollY,
                      width:
                        scrollableParent.getBoundingClientRect().left + window.scrollX,
                      height: scrollableParent.getBoundingClientRect().height,
                      backgroundColor: `rgba(${shadowRgb}, ${shadowOpacity})`,
                    }}
                  ></div>

                  {/* Right overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      pointerEvents: 'auto',
                      top: scrollableParent.getBoundingClientRect().top + window.scrollY,
                      left: `${scrollableParent.getBoundingClientRect().right + window.scrollX
                        }px`,
                      width: `${document.body.scrollWidth -
                        scrollableParent.getBoundingClientRect().right -
                        window.scrollX
                        }px`,
                      height: scrollableParent.getBoundingClientRect().height,
                      backgroundColor: `rgba(${shadowRgb}, ${shadowOpacity})`,
                    }}
                  ></div>
                </div>
              )}
            </motion.div>
          </DynamicPortal>
        )}
    </div>
  );
};

export default NextStepReact;

// Helper function to find the scrollable parent of an element
const getScrollableParent = (element: Element): HTMLElement | Element => {
  let parent: HTMLElement | null = element.parentElement;

  while (parent) {
    const computedStyle = getComputedStyle(parent);
    const overflowY = computedStyle.overflowY;
    const overflowX = computedStyle.overflowX;
    const isScrollableY = overflowY === 'scroll' || overflowY === 'auto';
    const isScrollableX = overflowX === 'scroll' || overflowX === 'auto';

    if (
      (isScrollableY && parent.scrollHeight > parent.clientHeight) ||
      (isScrollableX && parent.scrollWidth > parent.clientWidth)
    ) {
      return parent; // Found a scrollable parent
    }

    parent = parent.parentElement;
  }

  // No scrollable parent found, return the element itself
  return element;
};

// Check if element is scrollable
const isElementScrollable = (element: Element): boolean => {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth ||
    element === document.body
  );
};
