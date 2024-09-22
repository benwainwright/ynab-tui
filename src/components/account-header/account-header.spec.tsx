import { AccountHeader } from './account-header.tsx'
import { AccountType } from 'ynab'
import { stripRender } from '@test-support'
import { render } from 'ink-testing-library'

describe('<AccountHeader>', () => {
    it('should render the account header text correctly', () => {
        const { lastFrame } = stripRender(
            <AccountHeader
                name="Test Account"
                balance={1000}
                unclearedBalance={1200}
                clearedBalance={1300}
                type={AccountType.LineOfCredit}
                currencyCode="GBP"
                localeCode="en-GB"
            />
        )

        expect(lastFrame()).toMatchInlineSnapshot(`
      " Name Test Account                           £1,300.00     +      £1,200.00      =     £1,000.00
       Type Line of Credit                      Cleared Balance     Uncleared Balance     Working Balance"
    `)
    })
})
