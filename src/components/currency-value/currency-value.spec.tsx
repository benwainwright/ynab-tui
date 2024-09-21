import { cleanup } from 'ink-testing-library'
import { stripRender } from '@test-support'
import { CurrencyValue } from './currency-value.tsx'

beforeEach(() => {
  cleanup()
})

describe('<CurrencyValue>', () => {
  it('should render the currency value in the correct format', () => {
    const { lastFrame } = stripRender(
      <CurrencyValue value={1000} localeCode="en-GB" currencyCode="GBP" />,
    )

    expect(lastFrame()).toMatchInlineSnapshot(`"£1,000.00"`)
  })
})
