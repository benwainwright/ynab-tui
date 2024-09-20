import { getApi } from "../../core/index.js";
import { useEffect, useState } from "react";
import { useConfig } from "../index.js";
export const useBudget = (config)=>{
    const [budget, setBudget] = useState();
    useEffect(()=>{
        const asyncContext = async ()=>{
            const { apiAuthStrategy } = useConfig();
            const api = await getApi(apiAuthStrategy);
            const { data: { budgets: [budget] } } = await api.budgets.getBudgets(config.includeAccounts);
            setBudget(budget);
        };
        asyncContext();
    }, []);
    return {
        budget
    };
};

//# sourceMappingURL=use-budget.js.map