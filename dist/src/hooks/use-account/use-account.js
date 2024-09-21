import { useApi, useBudget } from "../index.js";
import { useEffect, useState } from "react";
export const useAccount = (config)=>{
    const [transactions, setTransactions] = useState();
    const { api } = useApi();
    const { budget } = useBudget({
        includeAccounts: true
    });
    const [range, setRange] = useState([
        0,
        0
    ]);
    const account = budget?.accounts?.find((account)=>account.name === config.name);
    useEffect(()=>{
        const asyncContext = async ()=>{
            if (api && budget) {
                if (!transactions && account) {
                    const { data: { transactions: transactionsReturned } } = await api.transactions.getTransactionsByAccount(budget.id, account.id);
                    setTransactions(transactionsReturned);
                }
            }
        };
        asyncContext();
    }, [
        api,
        budget,
        transactions,
        account
    ]);
    return {
        account,
        transactions,
        range
    };
};

//# sourceMappingURL=use-account.js.map