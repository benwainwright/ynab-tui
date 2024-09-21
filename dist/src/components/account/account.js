import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useAccount } from "../../hooks/index.js";
import { Box } from "ink";
import { AccountHeader, Loading, TransactionList } from "../index.js";
export const Account = ({ name })=>{
    const { transactions, account } = useAccount({
        name
    });
    return /*#__PURE__*/ _jsx(Box, {
        padding: 1,
        flexDirection: "column",
        children: /*#__PURE__*/ _jsx(Loading, {
            data: {
                transactions,
                account
            },
            name: "account",
            children: ({ transactions, account })=>{
                return /*#__PURE__*/ _jsxs(_Fragment, {
                    children: [
                        /*#__PURE__*/ _jsx(Box, {
                            borderStyle: "single",
                            children: /*#__PURE__*/ _jsx(AccountHeader, {
                                currencyCode: "GBP",
                                localeCode: "en-GB",
                                name: account.name,
                                balance: account.balance,
                                unclearedBalance: account.uncleared_balance,
                                clearedBalance: account.cleared_balance
                            })
                        }),
                        /*#__PURE__*/ _jsx(TransactionList, {
                            transactions: transactions,
                            pageSize: 10
                        })
                    ]
                });
            }
        })
    });
};

//# sourceMappingURL=account.js.map