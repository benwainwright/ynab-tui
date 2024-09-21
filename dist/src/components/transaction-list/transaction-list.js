import { jsx as _jsx } from "react/jsx-runtime";
import { Table } from "../index.js";
import { Box, useInput } from "ink";
import { useState } from "react";
export const TransactionList = ({ pageSize, transactions })=>{
    const transactionRows = transactions.map((transaction)=>({
            date: transaction.date,
            payee: transaction.import_payee_name ?? '',
            amount: new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP'
            }).format(transaction.amount / 1000)
        }));
    const [range, setRange] = useState([
        0,
        pageSize
    ]);
    const next = ()=>{
        if (pageSize) {
            const left = range[0] + pageSize;
            const finalLeft = left > transactions.length ? range[0] : left;
            setRange([
                finalLeft,
                finalLeft + pageSize
            ]);
        }
    };
    const previous = ()=>{
        if (pageSize) {
            const left = range[0] - pageSize;
            const finalLeft = left < 0 ? 0 : left;
            setRange([
                finalLeft,
                finalLeft + pageSize
            ]);
        }
    };
    useInput((input, key)=>{
        if (key.leftArrow) {
            previous();
        } else if (key.rightArrow) {
            next();
        }
    });
    return /*#__PURE__*/ _jsx(Box, {
        children: /*#__PURE__*/ _jsx(Table, {
            data: transactionRows,
            start: range[0],
            end: range[1]
        })
    });
};

//# sourceMappingURL=transaction-list.js.map