import { Text } from 'ink'
import { AccountType } from 'ynab'

export const AccountTypeLabel = ({ type }: { type: AccountType }) => {
  const types = {
    [AccountType.Checking]: 'Checking',
    [AccountType.AutoLoan]: 'Auto Loan',
    [AccountType.Cash]: 'Cash',
    [AccountType.CreditCard]: 'Credit Card',
    [AccountType.LineOfCredit]: 'Line of Credit',
    [AccountType.MedicalDebt]: 'Medical Debt',
    [AccountType.Mortgage]: 'Mortgage',
    [AccountType.OtherAsset]: 'Other Asset',
    [AccountType.OtherDebt]: 'Other Debt',
    [AccountType.OtherLiability]: 'Other Liability',
    [AccountType.PersonalLoan]: 'Personal Loan',
    [AccountType.Savings]: 'Savings',
    [AccountType.StudentLoan]: 'Student Loan',
  }
  return <Text>{types[type]}</Text>
}
