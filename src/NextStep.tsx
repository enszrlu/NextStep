'use client';
import React from 'react';

// Types
import { NextStepProps } from './types';
import NextStepReact from './NextStepReact';
import { useNextAdapter } from './adapters/next';

const NextStep: React.FC<NextStepProps> = ({
  children,
  steps,
  shadowRgb = '0, 0, 0',
  shadowOpacity = '0.2',
  cardTransition = { ease: 'anticipate', duration: 0.6 },
  cardComponent: CardComponent,
  onStart = () => {},
  onStepChange = () => {},
  onComplete = () => {},
  onSkip = () => {},
  displayArrow = true,
  clickThroughOverlay = false,
  navigationAdapter = useNextAdapter,
  disableConsoleLogs = false,
  scrollToTop = true,
  noInViewScroll = false,
}) => {
  return (
    <NextStepReact
      children={children}
      steps={steps}
      shadowRgb={shadowRgb}
      shadowOpacity={shadowOpacity}
      cardTransition={cardTransition}
      cardComponent={CardComponent}
      onStart={onStart}
      onStepChange={onStepChange}
      onComplete={onComplete}
      onSkip={onSkip}
      displayArrow={displayArrow}
      clickThroughOverlay={clickThroughOverlay}
      navigationAdapter={navigationAdapter}
      disableConsoleLogs={disableConsoleLogs}
      scrollToTop={scrollToTop}
      noInViewScroll={noInViewScroll}
    />
  );
};

export default NextStep;
