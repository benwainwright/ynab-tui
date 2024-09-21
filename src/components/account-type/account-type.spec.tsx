import { stripRender } from '@test-support'
import { AccountType } from 'ynab'
import { AccountTypeLabel } from './account-type.tsx'

describe('account type', () => {
  it.each`
    type                          | text
    ${AccountType.AutoLoan}       | ${'Auto Loan'}
    ${AccountType.Cash}           | ${'Cash'}
    ${AccountType.Checking}       | ${'Checking'}
    ${AccountType.CreditCard}     | ${'Credit Card'}
    ${AccountType.LineOfCredit}   | ${'Line of Credit'}
    ${AccountType.MedicalDebt}    | ${'Medical Debt'}
    ${AccountType.Mortgage}       | ${'Mortgage'}
    ${AccountType.OtherAsset}     | ${'Other Asset'}
    ${AccountType.OtherDebt}      | ${'Other Debt'}
    ${AccountType.OtherLiability} | ${'Other Liability'}
    ${AccountType.PersonalLoan}   | ${'Personal Loan'}
    ${AccountType.Savings}        | ${'Savings'}
    ${AccountType.StudentLoan}    | ${'Student Loan'}
    ${AccountType.PersonalLoan}   | ${'Personal Loan'}
    ${AccountType.Savings}        | ${'Savings'}
  `(
    'Should render the correct text for the given account type',
    ({ type, text }) => {
      const { lastFrame } = stripRender(<AccountTypeLabel type={type} />)

      expect(lastFrame()).toMatchSnapshot()
    },
  )
})
