import { Text } from 'ink'

interface CurrencyValueProps {
  localeCode: string
  currencyCode: string
  value: number
}

export const CurrencyValue = ({
  value,
  localeCode,
  currencyCode,
}: CurrencyValueProps) => {
  return (
    <Text color="green" bold>
      {new Intl.NumberFormat(localeCode, {
        style: 'currency',
        currency: currencyCode,
      }).format(value)}
    </Text>
  )
}
