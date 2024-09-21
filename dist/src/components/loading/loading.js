import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Text } from "ink";
import Spinner from "ink-spinner";
export const Loading = ({ data, children, name })=>{
    const allHere = Object.values(data).every((value)=>Boolean(value));
    return !allHere ? /*#__PURE__*/ _jsx(Box, {
        children: /*#__PURE__*/ _jsxs(Text, {
            color: "green",
            children: [
                /*#__PURE__*/ _jsx(Spinner, {
                    type: "dots"
                }),
                " Loading ",
                name
            ]
        })
    }) : /*#__PURE__*/ _jsx(_Fragment, {
        children: children(data)
    });
};

//# sourceMappingURL=loading.js.map