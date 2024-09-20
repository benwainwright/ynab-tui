import { CurrencyValue, Scalar, Table } from '@components'
import { Box, Text } from 'ink'
import { TransactionSummary } from 'ynab'

interface TransactionListProps {
  transactions: TransactionSummary[]
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const transactionRows = transactions.map((transaction) => ({
    date: transaction.date,
    payee: transaction.import_payee_name ?? '',
    amount: new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(transaction.amount / 1000),
  }))

  return (
    <Box>
      <Table data={transactionRows} />
    </Box>
  )
}
