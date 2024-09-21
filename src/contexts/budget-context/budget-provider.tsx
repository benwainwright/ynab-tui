import { useBudget } from '@hooks'
import { BudgetContext } from './budget-context.ts'

interface BudgetProviderProps {
  children: React.ReactNode
}

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const budget = useBudget({ includeAccounts: true })

  return (
    <BudgetContext.Provider value={budget}>{children}</BudgetContext.Provider>
  )
}
