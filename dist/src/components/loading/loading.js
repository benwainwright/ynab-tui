import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Text } from "ink";
export const Loading = ({ loaded, children })=>{
    return !loaded ? /*#__PURE__*/ _jsx(Box, {
        children: /*#__PURE__*/ _jsx(Text, {
            children: "Loading"
        })
    }) : /*#__PURE__*/ _jsx(_Fragment, {
        children: children
    });
};

//# sourceMappingURL=loading.js.map