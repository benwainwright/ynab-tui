import { useEffect, useState } from "react";
import { useApi } from "../index.js";
export const useBudget = (config)=>{
    const [budget, setBudget] = useState();
    const { api } = useApi();
    useEffect(()=>{
        const asyncContext = async ()=>{
            if (api) {
                const { data: { budgets: [budget] } } = await api.budgets.getBudgets(config?.includeAccounts);
                setBudget(budget);
            }
        };
        if (!budget) {
            asyncContext();
        }
    }, [
        api
    ]);
    return {
        budget
    };
};

//# sourceMappingURL=use-budget.js.map