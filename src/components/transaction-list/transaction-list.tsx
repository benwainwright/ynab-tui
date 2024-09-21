import { CurrencyValue, Scalar, Table } from '@components'
import { Box, Text, useInput } from 'ink'
import { useState } from 'react'
import { TransactionDetail } from 'ynab'
import { useTransactionList } from './use-transaction-list.ts'

interface TransactionListProps {
  transactions: TransactionDetail[]
  pageSize: number
  approveTransaction: (id: string) => Promise<void>
  unapproveTransaction: (id: string) => Promise<void>
  clearTransaction: (id: string) => Promise<void>
  unclearTransaction: (id: string) => Promise<void>
}

export const TransactionList = ({
  pageSize,
  transactions,
  clearTransaction,
  unclearTransaction,
  unapproveTransaction,
  approveTransaction,
}: TransactionListProps) => {
  const { tableRows, start, end, selected } = useTransactionList({
    pageSize,
    transactions,
    clearTransaction,
    unclearTransaction,
    unapproveTransaction,
    approveTransaction,
  })

  return (
    <Box>
      <Table data={tableRows} start={start} end={end} selected={selected} />
    </Box>
  )
}
