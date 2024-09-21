import { useEffect, useState } from 'react'
import { BudgetSummary } from 'ynab'
import { useApi } from '@hooks'

interface UseBudgetConfig {
  includeAccounts?: boolean
  dirty?: boolean
}

export const useBudget = (config?: UseBudgetConfig) => {
  const [budget, setBudget] = useState<BudgetSummary | undefined>()
  const { api } = useApi()

  useEffect(() => {
    const asyncContext = async () => {
      if (api) {
        const {
          data: {
            budgets: [budget],
          },
        } = await api.budgets.getBudgets(config?.includeAccounts)

        setBudget(budget)
      }
    }

    void asyncContext()
  }, [api, config?.dirty])

  return { budget }
}
