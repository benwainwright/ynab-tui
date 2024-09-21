import { createContext } from 'react'
import { BudgetSummary } from 'ynab'

interface WithBudget {
  budget: BudgetSummary
  refresh: () => void
}

interface WithoutBudget {
  budget: undefined
  refresh: undefined
}

export const BudgetContext = createContext<WithBudget | WithoutBudget>({
  budget: undefined,
  refresh: undefined,
})
