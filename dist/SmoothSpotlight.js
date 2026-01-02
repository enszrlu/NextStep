import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'motion/react';
const SmoothSpotlight = ({ x, y, width, height, padding, radius, shadowOpacity, shadowRgb, zIndex, }) => {
    const px = x - padding / 2;
    const py = y - padding / 2;
    const pw = width + padding;
    const ph = height + padding;
    return (_jsx("div", { style: {
            position: 'absolute',
            inset: 0,
            zIndex: zIndex,
            pointerEvents: 'none',
        }, children: _jsxs("svg", { width: "100%", height: "100%", children: [_jsx("defs", { children: _jsxs("mask", { id: "smooth-spotlight-mask", children: [_jsx("rect", { width: "100%", height: "100%", fill: "white" }), _jsx(motion.rect, { initial: false, animate: {
                                    x: px,
                                    y: py,
                                    width: pw,
                                    height: ph,
                                    rx: radius,
                                    ry: radius,
                                }, transition: { duration: 0.4, ease: 'easeInOut' }, fill: "black" })] }) }), _jsx("rect", { width: "100%", height: "100%", fill: `rgba(${shadowRgb}, ${shadowOpacity})`, mask: "url(#smooth-spotlight-mask)" })] }) }));
};
export default SmoothSpotlight;
