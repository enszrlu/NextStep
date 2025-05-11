import React from 'react';
import { motion } from 'motion/react';

// special thanks to https://github.com/enszrlu/NextStep/issues/32 @dinamicby

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

const SmoothSpotlight: React.FC<SmoothSpotlightProps> = ({
  x,
  y,
  width,
  height,
  padding,
  radius,
  shadowOpacity,
  shadowRgb,
}) => {
  const px = x - padding / 2;
  const py = y - padding / 2;
  const pw = width + padding;
  const ph = height + padding;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 998,
        pointerEvents: 'none',
      }}
    >
      <svg width="100%" height="100%">
        <defs>
          <mask id="smooth-spotlight-mask">
            <rect width="100%" height="100%" fill="white" />
            <motion.rect
              initial={false}
              animate={{
                x: px,
                y: py,
                width: pw,
                height: ph,
                rx: radius,
                ry: radius,
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              fill="black"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`rgba(${shadowRgb}, ${shadowOpacity})`}
          mask="url(#smooth-spotlight-mask)"
        />
      </svg>
    </div>
  );
};

export default SmoothSpotlight;
