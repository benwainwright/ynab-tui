import { useInput } from 'ink'
import { useState } from 'react'
import { TransactionClearedStatus, TransactionDetail } from 'ynab'
import humanDate from 'human-date'

interface UseTransactionListConfig {
    transactions: TransactionDetail[]
    pageSize: number
    approveTransaction: (id: string) => Promise<void>
    unapproveTransaction: (id: string) => Promise<void>
    clearTransaction: (id: string) => Promise<void>
    unclearTransaction: (id: string) => Promise<void>
}

const getClearCell = (status: TransactionClearedStatus) => {
    switch (status) {
        case TransactionClearedStatus.Cleared:
            return { color: 'green', value: 'C' }
        case TransactionClearedStatus.Uncleared:
            return { color: 'red', value: 'U' }
        case TransactionClearedStatus.Reconciled:
            return { color: 'green', value: 'R' }
    }
}

export const useTransactionList = ({
    transactions,
    pageSize,
    approveTransaction,
    unapproveTransaction,
    clearTransaction,
    unclearTransaction,
}: UseTransactionListConfig) => {
    const tableRows = transactions.map((transaction) => ({
        date: humanDate.relativeTime(transaction.date),
        payee: transaction.payee_name ?? '',
        amount: new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
        }).format(transaction.amount / 1000),
        approved: transaction.approved
            ? { color: 'green', value: 'A' }
            : { value: 'U', color: 'red' },
        cleared: getClearCell(transaction.cleared),
    }))

    const actualPageSize = pageSize <= 0 ? transactions.length : pageSize

    const initialEnd =
        actualPageSize > transactions.length
            ? transactions.length
            : actualPageSize

    const [selected, setSelected] = useState<number | undefined>()
    const [range, setRange] = useState<[number, number]>([0, initialEnd])
    const start = range[0]
    const end = range[1] > transactions.length ? transactions.length : range[1]

    const next = () => {
        if (actualPageSize) {
            const left = start + actualPageSize
            const newStart = left >= transactions.length ? start : left

            const remaining = transactions.length - newStart

            const nextPageSize =
                remaining < actualPageSize ? remaining : actualPageSize

            const newEnd = newStart + nextPageSize

            if (selected !== undefined && selected > nextPageSize) {
                setSelected(undefined)
            }

            setRange([newStart, newEnd])
        }
    }
    const previous = () => {
        if (actualPageSize) {
            const left = start - actualPageSize
            const finalLeft = left < 0 ? 0 : left
            setRange([finalLeft, finalLeft + actualPageSize])
        }
    }

    const up = () => {
        setSelected(
            selected !== undefined && selected > 0 ? selected - 1 : undefined
        )
    }

    const down = () => {
        if (selected === undefined) {
            setSelected(0)
        } else {
            const currentPageSize = end - start
            setSelected(
                selected < currentPageSize - 1 ? selected + 1 : selected
            )
        }
    }

    const currentTransaction =
        selected !== undefined && transactions[range[0] + selected]

    const toggleApprove = async () => {
        if (currentTransaction) {
            if (currentTransaction.approved) {
                await unapproveTransaction(currentTransaction.id)
            } else {
                await approveTransaction(currentTransaction.id)
            }
        }
    }

    const toggleClear = async () => {
        if (currentTransaction) {
            if (
                currentTransaction.cleared ===
                TransactionClearedStatus.Uncleared
            ) {
                await clearTransaction(currentTransaction.id)
            } else if (
                currentTransaction.cleared === TransactionClearedStatus.Cleared
            ) {
                await unclearTransaction(currentTransaction.id)
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    useInput(async (input, key) => {
        if (key.leftArrow) {
            previous()
        } else if (key.rightArrow) {
            next()
        } else if (key.upArrow) {
            up()
        } else if (key.downArrow) {
            down()
        } else if (input === 'a') {
            await toggleApprove()
        } else if (input === 'c') {
            await toggleClear()
        }
    })

    return {
        tableRows,
        start,
        end,
        selected,
    }
}
