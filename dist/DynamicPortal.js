import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
const DynamicPortal = ({ viewportID, children }) => {
    const [wrapperElement, setWrapperElement] = useState(null);
    useEffect(() => {
        // If viewportID is provided, attempt to find the corresponding element
        if (viewportID) {
            const targetElement = document.getElementById(viewportID);
            if (targetElement) {
                setWrapperElement(targetElement);
            }
            else {
                console.warn(`Element with ID "${viewportID}" not found. Rendering into document body.`);
                setWrapperElement(document.body); // Default to body if element is not found
            }
        }
        else {
            // If no viewportID is provided, default to rendering in the body
            setWrapperElement(document.body);
        }
    }, [viewportID]);
    if (!wrapperElement) {
        return null; // Return null while wrapperElement is being determined
    }
    return createPortal(children, wrapperElement);
};
export default DynamicPortal;
