"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNextStep } from "./NextStepContext";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { Portal } from "@radix-ui/react-portal";

// Types
import { NextStepProps } from "./types";
import DefaultCard from './DefaultCard';

const NextStep: React.FC<NextStepProps> = ({
  children,
  steps,
  shadowRgb = "0, 0, 0",
  shadowOpacity = "0.2",
  cardTransition = { ease: "anticipate", duration: 0.6 },
  cardComponent: CardComponent,
  onStepChange = () => {},
  onComplete = () => {},
  onSkip = () => {},
  displayArrow = true,
  clickThroughOverlay = false,
}) => {
  const { currentTour, currentStep, setCurrentStep, isNextStepVisible, closeNextStep } =
    useNextStep();

  const currentTourSteps = steps.find(
    (tour) => tour.tour === currentTour
  )?.steps;

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

  // - -
  // Route Changes
  const router = useRouter();

  // - -
  // Initialize
  useEffect(() => {
    if (isNextStepVisible && currentTourSteps) {
      console.log("NextStep: Current Step Changed");

      const step = currentTourSteps[currentStep];
      if (step && step.selector) {
        const element = document.querySelector(step.selector) as Element | null;
        if (element) {
          setPointerPosition(getElementPosition(element));
          currentElementRef.current = element;
          setElementToScroll(element);

          const rect = element.getBoundingClientRect();
          const isInViewportWithOffset =
            rect.top >= -offset && rect.bottom <= window.innerHeight + offset;

          if (!isInView || !isInViewportWithOffset) {
            const side = checkSideCutOff(currentTourSteps?.[currentStep]?.side || "right");
            element.scrollIntoView({ behavior: "smooth", block: side.includes("top") ? "end" : side.includes("bottom") ? "start" : "center" });
          }
        }
      } else {
        // Reset pointer position to middle of the screen when selector is empty, undefined, or ""
        setPointerPosition({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          width: 0,
          height: 0,
        });
        currentElementRef.current = null;
        setElementToScroll(null);
      }
    }
  }, [currentStep, currentTourSteps, isInView, offset, isNextStepVisible]);

  // - -
  // Helper function to get element position
  const getElementPosition = (element: Element) => {
    const { top, left, width, height } = element.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    return {
      x: left + scrollLeft,
      y: top + scrollTop,
      width,
      height,
    };
  };

  // - -
  // Update pointerPosition when currentStep changes
  useEffect(() => {
    if (isNextStepVisible && currentTourSteps) {
      console.log("NextStep: Current Step Changed");
      const step = currentTourSteps[currentStep];
      if (step && step.selector) {
        const element = document.querySelector(step.selector) as Element | null;
        if (element) {
          setPointerPosition(getElementPosition(element));
          currentElementRef.current = element;
          setElementToScroll(element);

          const rect = element.getBoundingClientRect();
          const isInViewportWithOffset =
            rect.top >= -offset && rect.bottom <= window.innerHeight + offset;

          if (!isInView || !isInViewportWithOffset) {
            const side = checkSideCutOff(currentTourSteps?.[currentStep]?.side || "right");
            element.scrollIntoView({ behavior: "smooth", block: side.includes("top") ? "end" : side.includes("bottom") ? "start" : "center" });
          }
        }
      } else {
        // Reset pointer position to middle of the screen when selector is empty, undefined, or ""
        setPointerPosition({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          width: 0,
          height: 0,
        });
        currentElementRef.current = null;
        setElementToScroll(null);
      }
    }
  }, [currentStep, currentTourSteps, isInView, offset, isNextStepVisible]);

  useEffect(() => {
    if (elementToScroll && !isInView && isNextStepVisible) {
      console.log("NextStep: Element to Scroll Changed");

      const side = checkSideCutOff(currentTourSteps?.[currentStep]?.side || "right");
      elementToScroll.scrollIntoView({ behavior: "smooth", block: side.includes("top") ? "end" : side.includes("bottom") ? "start" : "center", inline: "center" });
    } else {
      // Scroll to the top of the body
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
        setPointerPosition({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          width: 0,
          height: 0,
        });
        currentElementRef.current = null;
        setElementToScroll(null);
      }
    }
  };

  // - -
  // Update pointer position on window resize
  useEffect(() => {
    if (isNextStepVisible) {
      window.addEventListener("resize", updatePointerPosition);
      return () => window.removeEventListener("resize", updatePointerPosition);
    }
  }, [currentStep, currentTourSteps, isNextStepVisible]);

  // - -
  // Update document height on window resize
  useEffect(() => {
    const updateDocumentHeight = () => {
      const height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      setDocumentHeight(height);
    };

    updateDocumentHeight();
    window.addEventListener('resize', updateDocumentHeight);
    return () => window.removeEventListener('resize', updateDocumentHeight);
  }, []);

  // - -
  // Step Controls
  const nextStep = async () => {
    if (currentTourSteps && currentStep < currentTourSteps.length - 1) {
      try {
        const nextStepIndex = currentStep + 1;
        const route = currentTourSteps[currentStep].nextRoute;

        onStepChange?.(nextStepIndex);

        if (route) {
          await router.push(route);

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
        console.error("Error navigating to next route", error);
      }
    }
    else if (currentTourSteps && currentStep === currentTourSteps.length - 1) {
      onComplete?.();
      closeNextStep();
    }
  };

  const prevStep = async () => {
    if (currentTourSteps && currentStep > 0) {
      try {
        const prevStepIndex = currentStep - 1;
        const route = currentTourSteps[currentStep].prevRoute;

        onStepChange?.(prevStepIndex);

        if (route) {
          await router.push(route);

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
        console.error("Error navigating to previous route", error);
      }
    }
  };

  // - -
  // Skip Tour
  const skipTour = useCallback(() => {
    closeNextStep();
    onSkip?.();
  }, [closeNextStep, onSkip]);

  // - -
  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isNextStepVisible && !currentTourSteps?.[currentStep]?.blockKeyboardControl) {
        switch (event.key) {
          case "ArrowRight":
            nextStep();
            break;
          case "ArrowLeft":
            prevStep();
            break;
          case "Escape":
            skipTour();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
          const isInViewport =
            top >= -offset && top <= window.innerHeight + offset;
          if (!isInViewport) {
            const side = checkSideCutOff(currentTourSteps?.[stepIndex]?.side || "right");
            element.scrollIntoView({ behavior: "smooth", block: side.includes("top") ? "end" : side.includes("bottom") ? "start" : "center" });
          }
          // Update pointer position after scrolling
          setPointerPosition(getElementPosition(element));
        }
      } else {
        // Reset pointer position to middle of the screen when selector is empty, undefined, or ""
        setPointerPosition({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          width: 0,
          height: 0,
        });
      }
    }
  };

  // - -
  // Check if Card is Cut Off on Sides
  const checkSideCutOff = (side: string) => {
    let tempSide = side;

    let removeSide = false;
    
    // Check if card would be cut off on sides
    if (side.startsWith("right") && pointerPosition && window.innerWidth < pointerPosition.x + pointerPosition.width + 256) {
      removeSide = true;
    }else if (side.startsWith("left") && pointerPosition && pointerPosition.x < 256) {
      removeSide = true;
    }

    // Check if card would be cut off on top or bottom
    if (side.includes("top") && pointerPosition && pointerPosition.y < 256) {
      if (removeSide) {
        tempSide = "bottom"
      } else{
        tempSide = side.replace("top", "bottom");
      }
    }
    else if (side.includes("bottom") && pointerPosition && pointerPosition.y + pointerPosition.height + 256 > window.innerHeight) {
      if (removeSide) {
        tempSide = "top"
      } else{
        tempSide = side.replace("bottom", "top");
      }
    }else if (removeSide) {
      tempSide = pointerPosition && pointerPosition.y < 256 ? "bottom" : "top";
    }

    return tempSide;
  };

  // - -
  // Card Side
  const getCardStyle = (side: string) : React.CSSProperties => {
    if (!side || !currentTourSteps?.[currentStep].selector) {
      // Center the card if the selector is undefined or empty
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", // Center the card
        position: "fixed", // Make sure it's positioned relative to the viewport
        margin: "0",
      };
    }

    side = checkSideCutOff(side)

    switch (side) {
      case "top":
        return {
          transform: `translate(-50%, 0)`,
          left: "50%",
          bottom: "100%",
          marginBottom: "25px",
        };
      case "bottom":
        return {
          transform: `translate(-50%, 0)`,
          left: "50%",
          top: "100%",
          marginTop: "25px",
        };
      case "left":
        return {
          transform: `translate(0, -50%)`,
          right: "100%",
          top: "50%",
          marginRight: "25px",
        };
      case "right":
        return {
          transform: `translate(0, -50%)`,
          left: "100%",
          top: "50%",
          marginLeft: "25px",
        };
      case "top-left":
        return {
          bottom: "100%",
          marginBottom: "25px",
        };
      case "top-right":
        return {
          right: 0,
          bottom: "100%",
          marginBottom: "25px",
        };
      case "bottom-left":
        return {
          top: "100%",
          marginTop: "25px",
        };
      case "bottom-right":
        return {
          right: 0,
          top: "100%",
          marginTop: "25px",
        };
      case "right-bottom":
        return {
          left: "100%",
          bottom: 0,
          marginLeft: "25px",
        };
      case "right-top":
        return {
          left: "100%",
          top: 0,
          marginLeft: "25px",
        };
      case "left-bottom":
        return {
          right: "100%",
          bottom: 0,
          marginRight: "25px",
        };
      case "left-top":
        return {
          right: "100%",
          top: 0,
          marginRight: "25px",
        };
      default:
        return {}; // Default case if no side is specified
    }
  };

  // - -
  // Arrow position based on card side
  const getArrowStyle = (side: string = 'right') => {
    side = checkSideCutOff(side);

    switch (side) {
      case "bottom":
        return {
          transform: `translate(-50%, 0) rotate(270deg)`,
          left: "50%",
          top: "-23px",
        };
      case "top":
        return {
          transform: `translate(-50%, 0) rotate(90deg)`,
          left: "50%",
          bottom: "-23px",
        };
      case "right":
        return {
          transform: `translate(0, -50%) rotate(180deg)`,
          top: "50%",
          left: "-23px",
        };
      case "left":
        return {
          transform: `translate(0, -50%) rotate(0deg)`,
          top: "50%",
          right: "-23px",
        };
      case "top-left":
        return {
          transform: `rotate(90deg)`,
          left: "10px",
          bottom: "-23px",
        };
      case "top-right":
        return {
          transform: `rotate(90deg)`,
          right: "10px",
          bottom: "-23px",
        };
      case "bottom-left":
        return {
          transform: `rotate(270deg)`,
          left: "10px",
          top: "-23px",
        };
      case "bottom-right":
        return {
          transform: `rotate(270deg)`,
          right: "10px",
          top: "-23px",
        };
      case "right-bottom":
        return {
          transform: `rotate(180deg)`,
          left: "-23px",
          bottom: "10px",
        };
      case "right-top":
        return {
          transform: `rotate(180deg)`,
          left: "-23px",
          top: "10px",
        };
      case "left-bottom":
        return {
          transform: `rotate(0deg)`,
          right: "-23px",
          bottom: "10px",
        };
      case "left-top":
        return {
          transform: `rotate(0deg)`,
          right: "-23px",
          top: "10px",
        };
      default:
        return {}; // Default case if no side is specified
    }
  };

  // - -
  // Card Arrow
  const CardArrow = ({isVisible}: {isVisible: boolean}) => {
    if (!isVisible) {
      return null;
    }
    return (
      <svg
        viewBox="0 0 54 54"
        data-name="nextstep-arrow"
        className="absolute w-6 h-6 origin-center"
        style={getArrowStyle(currentTourSteps?.[currentStep]?.side as any)}
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

  return (
    <div
      data-name="nextstep-wrapper"
      className="relative w-full"
      data-nextstep="dev"
    >
      {/* Container for the Website content */}
      <div data-name="nextstep-site" className="block w-full">
        {children}
      </div>

      {/* NextStep Overlay Step Content */}
      {pointerPosition && isNextStepVisible && (
        <Portal>
          <motion.div
            data-name="nextstep-overlay"
            className="absolute inset-0 overflow-hidden"
            initial="hidden"
            animate={isNextStepVisible ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.5 }}
            style={{
              height: `${documentHeight}px`,
              zIndex: 997, // Ensure it's below the pointer but above other content
              pointerEvents: 'none',
            }}
          >
            {/* Top Right Bottom Left Overlay around the pointer to prevent clicks */}
            {!clickThroughOverlay && (
            <div className="absolute inset-0 z-[998] pointer-events-none" style={{ width: '100vw', height: `${documentHeight}px` }}>
              {/* Top overlay */}
              <div 
                className="absolute top-0 left-0 right-0 pointer-events-auto" 
                style={{ height: Math.max(pointerPosition.y - pointerPadOffset, 0) }}
              ></div>
              
              {/* Bottom overlay */}
              <div 
                className="absolute left-0 right-0 pointer-events-auto" 
                style={{ 
                  top: `${pointerPosition.y + pointerPosition.height + pointerPadOffset}px`,
                  height: `${documentHeight - (pointerPosition.y + pointerPosition.height + pointerPadOffset)}px`
                }}
              ></div>
              
              {/* Left overlay */}
              <div 
                className="absolute left-0 top-0 pointer-events-auto" 
                style={{ 
                  width: Math.max(pointerPosition.x - pointerPadOffset, 0),
                  height: `${documentHeight}px`
                }}
              ></div>
              
              {/* Right overlay */}
              <div 
                className="absolute top-0 pointer-events-auto" 
                style={{ 
                  left: `${pointerPosition.x + pointerPosition.width + pointerPadOffset}px`,
                  right: 0,
                  height: `${documentHeight}px`
                }}
              ></div>
            </div>
            )}

            {/* Pointer */}
            <motion.div
              data-name="nextstep-pointer"
              className="relative z-[999]"
              style={{
                boxShadow: `0 0 200vw 9999vh rgba(${shadowRgb}, ${shadowOpacity})`,
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
              <div
                className="absolute flex flex-col max-w-[100%] transition-all min-w-min pointer-events-auto z-[999]"
                data-name="nextstep-card"
                style={getCardStyle(
                  currentTourSteps?.[currentStep]?.side as any
                )}
              >
                {CardComponent ? <CardComponent
                  step={currentTourSteps?.[currentStep]!}
                  currentStep={currentStep}
                  totalSteps={currentTourSteps?.length ?? 0}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  arrow={<CardArrow isVisible={!!(currentTourSteps?.[currentStep]?.selector && displayArrow)} />}
                  skipTour={skipTour}
                /> : <DefaultCard
                  step={currentTourSteps?.[currentStep]!}
                  currentStep={currentStep}
                  totalSteps={currentTourSteps?.length ?? 0}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  arrow={<CardArrow isVisible={!!(currentTourSteps?.[currentStep]?.selector && displayArrow)} />}
                  skipTour={skipTour}
                />}
              </div>
            </motion.div>
          </motion.div>
        </Portal>
      )}
    </div>
  );
};

export default NextStep;
