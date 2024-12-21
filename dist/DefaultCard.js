import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const DefaultCard = ({ step, currentStep, totalSteps, nextStep, prevStep, skipTour, arrow, }) => {
    return (_jsxs("div", { style: {
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            padding: '1rem',
            maxWidth: '32rem',
            minWidth: '16rem',
        }, children: [_jsxs("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                }, children: [_jsx("h2", { style: { fontSize: '1.125rem', fontWeight: 'bold' }, children: step.title }), step.icon && _jsx("span", { style: { fontSize: '1.5rem' }, children: step.icon })] }), _jsx("div", { style: { marginBottom: '1rem', fontSize: '0.875rem' }, children: step.content }), _jsx("div", { style: {
                    marginBottom: '1rem',
                    backgroundColor: '#E5E7EB',
                    borderRadius: '9999px',
                    height: '0.625rem',
                }, children: _jsx("div", { style: {
                        backgroundColor: '#2563EB',
                        height: '0.625rem',
                        borderRadius: '9999px',
                        width: `${((currentStep + 1) / totalSteps) * 100}%`,
                    } }) }), _jsxs("div", { style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    fontSize: '0.75rem',
                }, children: [_jsx("button", { onClick: prevStep, style: {
                            padding: '0.5rem 1rem',
                            fontWeight: '500',
                            color: '#4B5563',
                            backgroundColor: '#F3F4F6',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            display: step.showControls ? 'block' : 'none',
                        }, disabled: currentStep === 0, children: "Previous" }), _jsxs("span", { style: { color: '#6B7280', whiteSpace: 'nowrap' }, children: [currentStep + 1, " of ", totalSteps] }), currentStep === totalSteps - 1 ? (_jsx("button", { onClick: skipTour, style: {
                            padding: '0.5rem 1rem',
                            fontWeight: '500',
                            color: 'white',
                            backgroundColor: '#10B981',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            display: step.showControls ? 'block' : 'none',
                        }, children: "Finish" })) : (_jsx("button", { onClick: nextStep, style: {
                            padding: '0.5rem 1rem',
                            fontWeight: '500',
                            color: 'white',
                            backgroundColor: '#2563EB',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            display: step.showControls ? 'block' : 'none',
                        }, children: "Next" }))] }), arrow, skipTour && currentStep < totalSteps - 1 && (_jsx("button", { onClick: skipTour, style: {
                    marginTop: '1rem',
                    fontSize: '0.75rem',
                    width: '100%',
                    padding: '0.5rem 1rem',
                    fontWeight: '500',
                    color: '#4B5563',
                    backgroundColor: '#F3F4F6',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    display: step.showSkip ? 'block' : 'none',
                }, children: "Skip Tour" }))] }));
};
export default DefaultCard;
