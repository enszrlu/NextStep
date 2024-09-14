import React from 'react';
import { CardComponentProps } from './types';

const DefaultCard: React.FC<CardComponentProps> = ({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  skipTour,
  arrow,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg min-w-64">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{step.title}</h2>
        {step.icon && <span className="text-2xl">{step.icon}</span>}
      </div>
      
      <div className="mb-4">{step.content}</div>
      
      <div className="mb-4 bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center gap-4">
        <button 
          onClick={prevStep}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          disabled={currentStep === 0}
          style={{
            display: step.showControls ? 'block' : 'none',
          }}
        >
          Previous
        </button>
        <span className="text-sm text-gray-500 text-nowrap">
          {currentStep + 1} of {totalSteps}
        </span>
        {currentStep === totalSteps - 1 ? (
          <button 
            onClick={skipTour}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            style={{
              display: step.showControls ? 'block' : 'none',
            }}
          >
            Finish
          </button>
        ) : (
          <button 
            onClick={nextStep}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            style={{
              display: step.showControls ? 'block' : 'none',
            }}
          >
            Next
          </button>
        )}
      </div>
      
      {arrow}
      
      {skipTour && currentStep < totalSteps - 1 && (
        <button 
          onClick={skipTour}
          className="mt-4 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          style={{
            display: step.showSkip ? 'block' : 'none',
          }}
        >
          Skip Tour
        </button>
      )}
    </div>
  );
};

export default DefaultCard;
