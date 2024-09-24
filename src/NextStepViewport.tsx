import React from 'react';

interface NextStepViewportProps {
  children: React.ReactNode;
  id: string;
}

const NextStepViewport = ({ children, id }: NextStepViewportProps) => {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', margin: 0, padding: 0 }} id={id}>
      {children}
    </div>
  );
};

export default NextStepViewport;
