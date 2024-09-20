export const getFirstBudget = async (api)=>{
    const { data: { budgets: [budget] } } = await api.budgets.getBudgets(true);
    return budget;
};

//# sourceMappingURL=get-first-budget.js.map