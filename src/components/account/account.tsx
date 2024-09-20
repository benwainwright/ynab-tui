import { useBudget } from '@hooks'
import { Box, Text } from 'ink'
import { CurrencyValue, Loading } from '@components'

interface AccountProps {
  name: string
}

export const Account = ({ name }: AccountProps) => {
  const { budget } = useBudget({ includeAccounts: true })
  console.log(budget)
  const myAccount = budget?.accounts?.find((account) => account.name === name)
  return (
    <Loading loaded={Boolean(budget)} name="account">
      <Box borderStyle="single" gap={2} paddingX={1}>
        <Box>
          <Text bold>{myAccount?.name}</Text>
        </Box>
        <Box>
          <Text>
            <CurrencyValue
              currencyCode="GBP"
              localeCode="en-GB"
              value={myAccount?.cleared_balance ?? 0}
            />{' '}
            +{' '}
            <CurrencyValue
              currencyCode="GBP"
              localeCode="en-GB"
              value={myAccount?.uncleared_balance ?? 0}
            />{' '}
            ={' '}
            <CurrencyValue
              currencyCode="GBP"
              localeCode="en-GB"
              value={myAccount?.balance ?? 0}
            />
          </Text>
        </Box>
      </Box>
    </Loading>
  )
}
