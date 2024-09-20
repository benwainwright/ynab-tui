import { useBudget, useAccount } from '@hooks'
import { Box, Text } from 'ink'
import {
  AccountHeader,
  CurrencyValue,
  Loading,
  TransactionList,
} from '@components'

interface AccountProps {
  name: string
}

export const Account = ({ name }: AccountProps) => {
  const { transactions, account } = useAccount({ name })

  return (
    <Box padding={1} flexDirection="column">
      <Loading data={{ transactions, account }} name="account">
        {({ transactions, account }) => {
          return (
            <>
              <Box borderStyle="single">
                <AccountHeader
                  currencyCode="GBP"
                  localeCode="en-GB"
                  name={account.name}
                  balance={account.balance}
                  unclearedBalance={account.uncleared_balance}
                  clearedBalance={account.cleared_balance}
                />
              </Box>
              <TransactionList transactions={transactions} />
            </>
          )
        }}
      </Loading>
    </Box>
  )
}
