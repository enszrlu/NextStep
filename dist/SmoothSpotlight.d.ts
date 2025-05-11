import React from 'react';
interface SmoothSpotlightProps {
    x: number;
    y: number;
    width: number;
    height: number;
    padding: number;
    radius: number;
    shadowOpacity: string;
    shadowRgb: string;
}
declare const SmoothSpotlight: React.FC<SmoothSpotlightProps>;
export default SmoothSpotlight;
