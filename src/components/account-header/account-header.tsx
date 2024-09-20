import { CurrencyValue } from '@components'
import { Box, Text } from 'ink'

interface AccountHeaderProps {
  name: string
  clearedBalance: number
  unclearedBalance: number
  balance: number
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
}: AccountHeaderProps) => {
  return (
    <Box flexDirection="row" gap={1} paddingX={1}>
      <Box>
        <Text bold color="green">{name}</Text>
      </Box>
      <Box>
        <Text>
          <CurrencyValue
            currencyCode={currencyCode}
            localeCode={localeCode}
            value={clearedBalance}
          />{' '}
          +{' '}
          <CurrencyValue
            currencyCode={currencyCode}
            localeCode={localeCode}
            value={unclearedBalance}
          />{' '}
          ={' '}
          <CurrencyValue
            currencyCode={currencyCode}
            localeCode={localeCode}
            value={balance}
          />
        </Text>
      </Box>
    </Box>
  )
}
