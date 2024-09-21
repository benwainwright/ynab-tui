import { CurrencyValue, Scalar, Table } from '@components'
import { Box, Text, useInput } from 'ink'
import { useState } from 'react'
import { TransactionSummary } from 'ynab'

interface TransactionListProps {
  transactions: TransactionSummary[]
  pageSize: number
}

export const TransactionList = ({
  pageSize,
  transactions,
}: TransactionListProps) => {
  const transactionRows = transactions.map((transaction) => ({
    date: transaction.date,
    payee: transaction.import_payee_name ?? '',
    amount: new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(transaction.amount / 1000),
    approved: transaction.approved ? 'Approved' : 'Not Approved',
  }))

  const [range, setRange] = useState<[number, number]>([0, pageSize])

  const next = () => {
    if (pageSize) {
      const left = range[0] + pageSize
      const finalLeft = left > transactions.length ? range[0] : left
      setRange([finalLeft, finalLeft + pageSize])
    }
  }
  const previous = () => {
    if (pageSize) {
      const left = range[0] - pageSize
      const finalLeft = left < 0 ? 0 : left
      setRange([finalLeft, finalLeft + pageSize])
    }
  }

  useInput((input, key) => {
    if (key.leftArrow) {
      previous()
    } else if (key.rightArrow) {
      next()
    }
  })

  return (
    <Box>
      <Table data={transactionRows} start={range[0]} end={range[1]} />
    </Box>
  )
}
