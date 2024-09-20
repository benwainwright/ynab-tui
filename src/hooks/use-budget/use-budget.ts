import { getApi, getFirstBudget } from '@core'
import { useEffect, useState } from 'react'
import { BudgetSummary } from 'ynab'
import { useConfig, useApi } from '@hooks'

interface UseBudgetConfig {
  includeAccounts?: boolean
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

    if (!budget) {
      asyncContext()
    }
  }, [api])

  return { budget }
}
