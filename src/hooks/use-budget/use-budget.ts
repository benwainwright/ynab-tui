import { useContext, useEffect, useState } from 'react'
import { BudgetSummary } from 'ynab'
import { ApiContext } from '@contexts'

interface UseBudgetConfig {
  includeAccounts?: boolean
  dirty?: boolean
}

export const useBudget = (config?: UseBudgetConfig) => {
  const [budget, setBudget] = useState<BudgetSummary | undefined>()
  const [dirty, setDirty] = useState(true)
  const { api } = useContext(ApiContext)

  const refresh = () => {
    setDirty(true)
  }

  useEffect(() => {
    try {
      const asyncContext = async () => {
        if (api) {
          const {
            data: {
              budgets: [budget],
            },
          } = await api.budgets.getBudgets(config?.includeAccounts)

          setBudget(budget)
          setDirty(false)
        }
      }

      if (dirty) {
        void asyncContext()
      }
    } catch (e) {
      console.log(e)
    }
  }, [api, dirty])

  if (budget) {
    return { budget, refresh }
  } else {
    return { budget: undefined, refresh: undefined }
  }
}
