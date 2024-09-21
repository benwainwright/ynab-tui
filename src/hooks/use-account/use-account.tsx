import { useContext, useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import { ApiContext, BudgetContext } from '@contexts'

import {
  ExistingTransaction,
  TransactionClearedStatus,
  TransactionDetail,
} from 'ynab'

interface UseAccountConfig {
  name?: string
}

export const useAccount = (config: UseAccountConfig) => {
  const [transactions, setTransactions] = useState<
    TransactionDetail[] | undefined
  >()

  const [dirty, setDirty] = useState(true)
  const { api } = useContext(ApiContext)
  const result = useContext(BudgetContext)
  const { budget, refresh } = result

  const account = budget?.accounts?.find(
    (account) => account.name === config.name,
  )

  const updateTransaction = async (
    transactionId: string,
    transactionDetails: ExistingTransaction,
  ) => {
    if (!budget || !api) {
      throw new Error('Budget and API must be defined')
    }
    const result = await api.transactions.updateTransaction(
      budget.id,
      transactionId,
      {
        transaction: transactionDetails,
      },
    )
    setDirty(true)
    refresh()
  }

  useEffect(() => {
    const asyncContext = async () => {
      try {
        if (api && budget) {
          if (account) {
            const {
              data: { transactions: transactionsReturned },
            } = await api.transactions.getTransactionsByAccount(
              budget.id,
              account.id,
            )

            setTransactions(
              transactionsReturned.slice().sort((a, b) => {
                return DateTime.fromISO(a.date) > DateTime.fromISO(b.date)
                  ? -1
                  : 1
              }),
            )
            setDirty(false)
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
    if (dirty) {
      void asyncContext()
    }
  }, [api, budget, transactions, account, dirty])

  const clearTransaction = async (id: string) => {
    const transaction = transactions?.find(
      (transaction) => transaction.id === id,
    )

    await updateTransaction(id, {
      ...transaction,
      cleared: TransactionClearedStatus.Cleared,
    })
  }

  const approveTransaction = async (id: string) => {
    const transaction = transactions?.find(
      (transaction) => transaction.id === id,
    )

    await updateTransaction(id, {
      ...transaction,
      approved: true,
    })
  }

  const unapproveTransaction = async (id: string) => {
    const transaction = transactions?.find(
      (transaction) => transaction.id === id,
    )
    await updateTransaction(id, {
      ...transaction,
      approved: false,
    })
  }

  const unclearTransaction = async (id: string) => {
    const transaction = transactions?.find(
      (transaction) => transaction.id === id,
    )

    await updateTransaction(id, {
      ...transaction,
      cleared: TransactionClearedStatus.Uncleared,
    })
  }

  return {
    account,
    transactions,
    updateTransaction,
    approveTransaction,
    unapproveTransaction,
    clearTransaction,
    unclearTransaction,
  }
}
