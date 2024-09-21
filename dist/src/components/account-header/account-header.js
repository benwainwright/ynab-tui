import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CurrencyValue } from "../index.js";
import { Box, Text } from "ink";
export const AccountHeader = ({ name, clearedBalance, unclearedBalance, balance, currencyCode, localeCode })=>{
    return /*#__PURE__*/ _jsxs(Box, {
        flexDirection: "row",
        gap: 1,
        paddingX: 1,
        children: [
            /*#__PURE__*/ _jsx(Box, {
                children: /*#__PURE__*/ _jsx(Text, {
                    bold: true,
                    color: "green",
                    children: name
                })
            }),
            /*#__PURE__*/ _jsx(Box, {
                children: /*#__PURE__*/ _jsxs(Text, {
                    children: [
                        /*#__PURE__*/ _jsx(CurrencyValue, {
                            currencyCode: currencyCode,
                            localeCode: localeCode,
                            value: clearedBalance
                        }),
                        ' ',
                        "+",
                        ' ',
                        /*#__PURE__*/ _jsx(CurrencyValue, {
                            currencyCode: currencyCode,
                            localeCode: localeCode,
                            value: unclearedBalance
                        }),
                        ' ',
                        "=",
                        ' ',
                        /*#__PURE__*/ _jsx(CurrencyValue, {
                            currencyCode: currencyCode,
                            localeCode: localeCode,
                            value: balance
                        })
                    ]
                })
            })
        ]
    });
};

//# sourceMappingURL=account-header.js.map