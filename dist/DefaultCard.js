import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const DefaultCard = ({ step, currentStep, totalSteps, nextStep, prevStep, skipTour, arrow, showControls }) => {
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6 max-w-lg min-w-64", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-xl font-bold", children: step.title }), step.icon && _jsx("span", { className: "text-2xl", children: step.icon })] }), _jsx("div", { className: "mb-4", children: step.content }), _jsx("div", { className: "mb-4 bg-gray-200 rounded-full h-2.5", children: _jsx("div", { className: "bg-blue-600 h-2.5 rounded-full", style: { width: `${((currentStep + 1) / totalSteps) * 100}%` } }) }), _jsxs("div", { className: "flex justify-between items-center gap-4", children: [_jsx("button", { onClick: prevStep, className: "px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500", disabled: currentStep === 0, style: {
                            display: showControls ? 'block' : 'none',
                        }, children: "Previous" }), _jsxs("span", { className: "text-sm text-gray-500 text-nowrap", children: [currentStep + 1, " of ", totalSteps] }), currentStep === totalSteps - 1 ? (_jsx("button", { onClick: skipTour, className: "px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500", style: {
                            display: showControls ? 'block' : 'none',
                        }, children: "Finish" })) : (_jsx("button", { onClick: nextStep, className: "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", style: {
                            display: showControls ? 'block' : 'none',
                        }, children: "Next" }))] }), arrow, skipTour && currentStep < totalSteps - 1 && (_jsx("button", { onClick: skipTour, className: "mt-4 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500", style: {
                    display: showControls ? 'block' : 'none',
                }, children: "Skip Tour" }))] }));
};
export default DefaultCard;
