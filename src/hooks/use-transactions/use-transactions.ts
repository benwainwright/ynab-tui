import { useApi, useBudget } from '@hooks'
import { useEffect, useState } from 'react'
import { TransactionSummary } from 'ynab'

interface UseTransactionsConfig {
  id?: string
}

export const useTransactions = (config: UseTransactionsConfig) => {
  const [transactions, setTransactions] = useState<
    TransactionSummary[] | undefined
  >()
  const { api } = useApi()
  const { budget } = useBudget()

  useEffect(() => {
    const { id } = config
    const asyncContext = async () => {
      if (api && budget && id) {
        const {
          data: { transactions: transactionsReturned },
        } = await api.transactions.getTransactionsByAccount(budget.id, id)
        setTransactions(transactionsReturned)
      }
    }

    asyncContext()
  }, [api, budget])

  return { transactions }
}
