import { API, BudgetSummary } from "ynab";

export const getFirstBudget = async (api: API): Promise<BudgetSummary> => {
  const {
    data: {
      budgets: [budget],
    },
  } = await api.budgets.getBudgets();
  return budget;
};
