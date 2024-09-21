import { useApi, useBudget } from '@hooks'
import { useEffect, useState } from 'react'
import { TransactionSummary, Account } from 'ynab'

interface UseAccountConfig {
  name?: string
}

export const useAccount = (config: UseAccountConfig) => {
  const [transactions, setTransactions] = useState<
    TransactionSummary[] | undefined
  >()
  const { api } = useApi()
  const { budget } = useBudget({ includeAccounts: true })

  const [range, setRange] = useState<[number, number]>([0, 0])

  const account = budget?.accounts?.find(
    (account) => account.name === config.name,
  )

  useEffect(() => {
    const asyncContext = async () => {
      if (api && budget) {
        if (!transactions && account) {
          const {
            data: { transactions: transactionsReturned },
          } = await api.transactions.getTransactionsByAccount(
            budget.id,
            account.id,
          )

          setTransactions(transactionsReturned)
        }
      }
    }

    asyncContext()
  }, [api, budget, transactions, account])

  return {
    account,
    transactions,
    range,
  }
}
