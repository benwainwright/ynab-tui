import { useAccount } from '@hooks'
import { Box } from 'ink'
import { AccountHeader, Loading, TransactionList } from '@components'

interface AccountProps {
    name: string
}

export const Account = ({ name }: AccountProps) => {
    const {
        transactions,
        account,
        clearTransaction,
        unclearTransaction,
        unapproveTransaction,
        approveTransaction,
    } = useAccount({
        name,
    })

    return (
        <Box padding={1} flexDirection="column">
            <Box
                borderStyle="single"
                flexDirection="column"
                gap={1}
                paddingX={1}
            >
                <Loading data={{ transactions, account }} name="account">
                    {({ transactions, account }) => {
                        return (
                            <>
                                <Box>
                                    <AccountHeader
                                        type={account.type}
                                        currencyCode="GBP"
                                        localeCode="en-GB"
                                        name={account.name}
                                        balance={account.balance / 1000}
                                        unclearedBalance={
                                            account.uncleared_balance / 1000
                                        }
                                        clearedBalance={
                                            account.cleared_balance / 1000
                                        }
                                    />
                                </Box>
                                <TransactionList
                                    transactions={transactions}
                                    pageSize={10}
                                    clearTransaction={clearTransaction}
                                    unclearTransaction={unclearTransaction}
                                    approveTransaction={approveTransaction}
                                    unapproveTransaction={unapproveTransaction}
                                />
                            </>
                        )
                    }}
                </Loading>
            </Box>
        </Box>
    )
}
