import { AccountTypeLabel, CurrencyValue } from '@components'
import { Box, Text } from 'ink'
import { AccountType } from 'ynab'

interface AccountHeaderProps {
  name: string
  clearedBalance: number
  unclearedBalance: number
  balance: number
  type: AccountType
  currencyCode: string
  localeCode: string
}

export const AccountHeader = ({
  name,
  clearedBalance,
  unclearedBalance,
  balance,
  currencyCode,
  localeCode,
  type,
}: AccountHeaderProps) => {
  return (
    <Box flexDirection="row" gap={1} paddingX={1} width={'100%'}>
      <Box flexDirection="column" flexGrow={2}>
        <Box>
          <Text>Name </Text>
          <Text bold color="green">
            {name}
          </Text>
        </Box>
        <Box>
          <Text bold>Type </Text>
          <Text bold color="green">
            <AccountTypeLabel type={type} />
          </Text>
        </Box>
      </Box>
      <Box flexDirection="row" gap={2}>
        <Box flexDirection="column" alignItems="center">
          <CurrencyValue
            currencyCode={currencyCode}
            localeCode={localeCode}
            value={clearedBalance}
          />
          <Text>Cleared Balance</Text>
        </Box>
        <Box flexDirection="column">
          <Text>+</Text>
        </Box>
        <Box flexDirection="column" alignItems="center">
          <CurrencyValue
            currencyCode={currencyCode}
            localeCode={localeCode}
            value={unclearedBalance}
          />
          <Text>Uncleared Balance</Text>
        </Box>
        <Box flexDirection="column">
          <Text>=</Text>
        </Box>
        <Box flexDirection="column" alignItems="center">
          <CurrencyValue
            currencyCode={currencyCode}
            localeCode={localeCode}
            value={balance}
          />
          <Text>Working Balance</Text>
        </Box>
      </Box>
    </Box>
  )
}
