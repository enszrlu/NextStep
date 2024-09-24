import React from 'react';

interface NextStepViewportProps {
  children: React.ReactNode;
  id: string;
}

const NextStepViewport = ({ children, id }: NextStepViewportProps) => {
  return (
    <div className="relative overflow-hidden m-0 p-0" id={id}>
      {children}
    </div>
  );
};

export default NextStepViewport;
