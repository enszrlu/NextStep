import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface DynamicPortalProps {
  wrapperID?: string;
  children: ReactNode;
}

const DynamicPortal: React.FC<DynamicPortalProps> = ({ wrapperID, children }) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // If wrapperID is provided, attempt to find the corresponding element
    if (wrapperID) {
      const targetElement = document.getElementById(wrapperID);
      if (targetElement) {
        setWrapperElement(targetElement);
      } else {
        console.warn(
          `Element with ID "${wrapperID}" not found. Rendering into document body.`,
        );
        setWrapperElement(document.body); // Default to body if element is not found
      }
    } else {
      // If no wrapperID is provided, default to rendering in the body
      setWrapperElement(document.body);
    }
  }, [wrapperID]);

  if (!wrapperElement) {
    return null; // Return null while wrapperElement is being determined
  }

  return createPortal(children, wrapperElement);
};

export default DynamicPortal;
