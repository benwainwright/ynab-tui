import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useBudget } from "../../hooks/index.js";
import { Box, Text } from "ink";
import { Loading } from "../loading/loading.js";
export const Account = ({ name })=>{
    const { budget } = useBudget({
        includeAccounts: true
    });
    const myAccount = budget?.accounts?.find((account)=>account.name === name);
    return /*#__PURE__*/ _jsx(Loading, {
        loaded: Boolean(budget),
        children: /*#__PURE__*/ _jsxs(Box, {
            children: [
                /*#__PURE__*/ _jsx(Box, {
                    children: /*#__PURE__*/ _jsx(Text, {
                        children: myAccount?.name
                    })
                }),
                /*#__PURE__*/ _jsx(Box, {
                    children: /*#__PURE__*/ _jsx(Text, {
                        children: myAccount?.balance
                    })
                })
            ]
        })
    });
};

//# sourceMappingURL=account.js.map