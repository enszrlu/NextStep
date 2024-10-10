import { jsx as _jsx } from "react/jsx-runtime";
const NextStepViewport = ({ children, id }) => {
    return (_jsx("div", { style: {
            position: 'relative',
            overflow: 'hidden',
            margin: 0,
            padding: 0,
            height: 'fit-content',
            width: 'fit-content',
            minHeight: '100%',
            minWidth: '100%',
        }, id: id, children: children }));
};
export default NextStepViewport;
