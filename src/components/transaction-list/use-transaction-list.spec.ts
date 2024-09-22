import { renderHook, act } from '@testing-library/react'
import { useTransactionList } from './use-transaction-list.ts'
import { useInput } from 'ink'
import { TransactionClearedStatus, TransactionDetail } from 'ynab'
import { vi } from 'vitest'
import { when } from 'vitest-when'
import { mock } from 'vitest-mock-extended'

vi.mock('ink', () => ({
    useInput: vi.fn(),
}))

describe('useTransactionList', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    it('should map transactions to tableRows correctly', () => {
        const mockApproveTransaction = vi.fn()
        const mockUnapproveTransaction = vi.fn()
        const mockClearTransaction = vi.fn()
        const mockUnclearTransaction = vi.fn()

        const transaction1 = mock<TransactionDetail>({
            id: '1',
            date: '2023-09-01',
            payee_name: 'Payee 1',
            amount: 100000,
            approved: false,
            cleared: TransactionClearedStatus.Uncleared,
        })

        const transaction2 = mock<TransactionDetail>({
            id: '2',
            date: '2023-09-02',
            payee_name: 'Payee 2',
            amount: 200000,
            approved: true,
            cleared: TransactionClearedStatus.Cleared,
        })

        const transactions: TransactionDetail[] = [transaction1, transaction2]

        const { result } = renderHook(() =>
            useTransactionList({
                transactions,
                pageSize: 10,
                approveTransaction: mockApproveTransaction,
                unapproveTransaction: mockUnapproveTransaction,
                clearTransaction: mockClearTransaction,
                unclearTransaction: mockUnclearTransaction,
            })
        )

        expect(result.current.tableRows).toEqual([
            {
                date: expect.any(String),
                payee: 'Payee 1',
                amount: '£100.00',
                approved: { color: 'red', value: 'U' },
                cleared: { color: 'red', value: 'U' },
            },
            {
                date: expect.any(String),
                payee: 'Payee 2',
                amount: '£200.00',
                approved: { color: 'green', value: 'A' },
                cleared: { color: 'green', value: 'C' },
            },
        ])
    })

    it('should handle pagination correctly via arrow keys', () => {
        const mockApproveTransaction = vi.fn()
        const mockUnapproveTransaction = vi.fn()
        const mockClearTransaction = vi.fn()
        const mockUnclearTransaction = vi.fn()
        let inputHandler: (input: string, key: unknown) => void = () => {}

        when(vi.mocked(useInput))
            .calledWith(expect.any(Function))
            .thenDo((handler) => {
                inputHandler = handler
            })

        const transaction1 = mock<TransactionDetail>({
            id: '1',
            date: '2023-09-01',
            payee_name: 'Payee 1',
            amount: 100000,
            approved: false,
            cleared: TransactionClearedStatus.Uncleared,
        })

        const transaction2 = mock<TransactionDetail>({
            id: '2',
            date: '2023-09-02',
            payee_name: 'Payee 2',
            amount: 200000,
            approved: true,
            cleared: TransactionClearedStatus.Cleared,
        })

        const transactions: TransactionDetail[] = [transaction1, transaction2]

        const { result } = renderHook(() =>
            useTransactionList({
                transactions,
                pageSize: 1,
                approveTransaction: mockApproveTransaction,
                unapproveTransaction: mockUnapproveTransaction,
                clearTransaction: mockClearTransaction,
                unclearTransaction: mockUnclearTransaction,
            })
        )

        expect(result.current.start).toBe(0)
        expect(result.current.end).toBe(1)

        // Simulate pressing right arrow key to go to next page
        act(() => {
            inputHandler('', { rightArrow: true })
        })

        expect(result.current.start).toBe(1)
        expect(result.current.end).toBe(2)

        // Simulate pressing left arrow key to go to previous page
        act(() => {
            inputHandler('', { leftArrow: true })
        })

        expect(result.current.start).toBe(0)
        expect(result.current.end).toBe(1)
    })

    it('should handle selection correctly via arrow keys', () => {
        const mockApproveTransaction = vi.fn()
        const mockUnapproveTransaction = vi.fn()
        const mockClearTransaction = vi.fn()
        const mockUnclearTransaction = vi.fn()
        let inputHandler: (input: string, key: unknown) => void = () => {}

        when(vi.mocked(useInput))
            .calledWith(expect.any(Function))
            .thenDo((handler) => {
                inputHandler = handler
            })

        const transaction1 = mock<TransactionDetail>({
            id: '1',
            date: '2023-09-01',
            payee_name: 'Payee 1',
            amount: 100000,
            approved: false,
            cleared: TransactionClearedStatus.Uncleared,
        })

        const transaction2 = mock<TransactionDetail>({
            id: '2',
            date: '2023-09-02',
            payee_name: 'Payee 2',
            amount: 200000,
            approved: true,
            cleared: TransactionClearedStatus.Cleared,
        })

        const transactions: TransactionDetail[] = [transaction1, transaction2]

        const { result } = renderHook(() =>
            useTransactionList({
                transactions,
                pageSize: 2,
                approveTransaction: mockApproveTransaction,
                unapproveTransaction: mockUnapproveTransaction,
                clearTransaction: mockClearTransaction,
                unclearTransaction: mockUnclearTransaction,
            })
        )

        expect(result.current.selected).toBeUndefined()

        // Simulate pressing down arrow key to select first item
        act(() => {
            inputHandler('', { downArrow: true })
        })

        expect(result.current.selected).toBe(0)

        // Simulate pressing down arrow key to select next item
        act(() => {
            inputHandler('', { downArrow: true })
        })

        expect(result.current.selected).toBe(1)

        // Simulate pressing up arrow key to move selection up
        act(() => {
            inputHandler('', { upArrow: true })
        })

        expect(result.current.selected).toBe(0)
    })

    it('should call approveTransaction when "a" is pressed and transaction is not approved', () => {
        const mockApproveTransaction = vi.fn()
        const mockUnapproveTransaction = vi.fn()
        const mockClearTransaction = vi.fn()
        const mockUnclearTransaction = vi.fn()
        let inputHandler: (input: string, key: unknown) => void = () => {}

        when(vi.mocked(useInput))
            .calledWith(expect.any(Function))
            .thenDo((handler) => {
                inputHandler = handler
            })

        const transaction = mock<TransactionDetail>({
            id: '1',
            date: '2023-09-01',
            payee_name: 'Payee 1',
            amount: 100000,
            approved: false,
            cleared: TransactionClearedStatus.Uncleared,
        })

        const transactions: TransactionDetail[] = [transaction]

        renderHook(() =>
            useTransactionList({
                transactions,
                pageSize: 1,
                approveTransaction: mockApproveTransaction,
                unapproveTransaction: mockUnapproveTransaction,
                clearTransaction: mockClearTransaction,
                unclearTransaction: mockUnclearTransaction,
            })
        )

        act(() => {
            inputHandler('', { downArrow: true })
        })

        act(() => {
            inputHandler('a', {})
        })

        expect(mockApproveTransaction).toHaveBeenCalledWith('1')
    })

    it('should call unapproveTransaction when "a" is pressed and transaction is approved', () => {
        const mockApproveTransaction = vi.fn()
        const mockUnapproveTransaction = vi.fn()
        const mockClearTransaction = vi.fn()
        const mockUnclearTransaction = vi.fn()
        let inputHandler: (input: string, key: unknown) => void = () => {}

        when(vi.mocked(useInput))
            .calledWith(expect.any(Function))
            .thenDo((handler) => {
                inputHandler = handler
            })

        const transaction = mock<TransactionDetail>({
            id: '2',
            date: '2023-09-02',
            payee_name: 'Payee 2',
            amount: 200000,
            approved: true,
            cleared: TransactionClearedStatus.Cleared,
        })

        const transactions: TransactionDetail[] = [transaction]

        renderHook(() =>
            useTransactionList({
                transactions,
                pageSize: 1,
                approveTransaction: mockApproveTransaction,
                unapproveTransaction: mockUnapproveTransaction,
                clearTransaction: mockClearTransaction,
                unclearTransaction: mockUnclearTransaction,
            })
        )

        act(() => {
            inputHandler('', { downArrow: true })
        })

        act(() => {
            inputHandler('a', {})
        })

        expect(mockUnapproveTransaction).toHaveBeenCalledWith('2')
    })

    it('should handle transaction with missing payee_name', () => {
        const mockApproveTransaction = vi.fn()
        const mockUnapproveTransaction = vi.fn()
        const mockClearTransaction = vi.fn()
        const mockUnclearTransaction = vi.fn()

        const transaction = mock<TransactionDetail>({
            id: '1',
            date: '2023-09-01',
            payee_name: undefined,
            amount: 100000,
            approved: false,
            cleared: TransactionClearedStatus.Uncleared,
        })

        const transactions: TransactionDetail[] = [transaction]

        const { result } = renderHook(() =>
            useTransactionList({
                transactions,
                pageSize: 10,
                approveTransaction: mockApproveTransaction,
                unapproveTransaction: mockUnapproveTransaction,
                clearTransaction: mockClearTransaction,
                unclearTransaction: mockUnclearTransaction,
            })
        )

        expect(result.current.tableRows).toEqual([
            {
                date: expect.any(String),
                payee: '',
                amount: '£100.00',
                approved: { color: 'red', value: 'U' },
                cleared: { color: 'red', value: 'U' },
            },
        ])
    })

    it('should format negative amounts correctly', () => {
        const mockApproveTransaction = vi.fn()
        const mockUnapproveTransaction = vi.fn()
        const mockClearTransaction = vi.fn()
        const mockUnclearTransaction = vi.fn()

        const transaction = mock<TransactionDetail>({
            id: '1',
            date: '2023-09-01',
            payee_name: 'Payee',
            amount: -50000,
            approved: false,
            cleared: TransactionClearedStatus.Uncleared,
        })

        const transactions: TransactionDetail[] = [transaction]

        const { result } = renderHook(() =>
            useTransactionList({
                transactions,
                pageSize: 10,
                approveTransaction: mockApproveTransaction,
                unapproveTransaction: mockUnapproveTransaction,
                clearTransaction: mockClearTransaction,
                unclearTransaction: mockUnclearTransaction,
            })
        )

        expect(result.current.tableRows).toEqual([
            {
                date: expect.any(String),
                payee: 'Payee',
                amount: '-£50.00',
                approved: { color: 'red', value: 'U' },
                cleared: { color: 'red', value: 'U' },
            },
        ])
    })

    it('should not call any action when "a" or "c" is pressed without selection', () => {
        const mockApproveTransaction = vi.fn()
        const mockUnapproveTransaction = vi.fn()
        const mockClearTransaction = vi.fn()
        const mockUnclearTransaction = vi.fn()
        let inputHandler: (input: string, key: unknown) => void = () => {}

        when(vi.mocked(useInput))
            .calledWith(expect.any(Function))
            .thenDo((handler) => {
                inputHandler = handler
            })

        const transactions: TransactionDetail[] = []

        renderHook(() =>
            useTransactionList({
                transactions,
                pageSize: 10,
                approveTransaction: mockApproveTransaction,
                unapproveTransaction: mockUnapproveTransaction,
                clearTransaction: mockClearTransaction,
                unclearTransaction: mockUnclearTransaction,
            })
        )

        act(() => {
            inputHandler('a', {})
            inputHandler('c', {})
        })

        expect(mockApproveTransaction).not.toHaveBeenCalled()
        expect(mockUnapproveTransaction).not.toHaveBeenCalled()
        expect(mockClearTransaction).not.toHaveBeenCalled()
        expect(mockUnclearTransaction).not.toHaveBeenCalled()
    })

    it('should not move selection beyond the bounds', () => {
        const mockApproveTransaction = vi.fn()
        const mockUnapproveTransaction = vi.fn()
        const mockClearTransaction = vi.fn()
        const mockUnclearTransaction = vi.fn()
        let inputHandler: (input: string, key: unknown) => void = () => {}

        when(vi.mocked(useInput))
            .calledWith(expect.any(Function))
            .thenDo((handler) => {
                inputHandler = handler
            })

        const transaction = mock<TransactionDetail>({
            id: '1',
            date: '2023-09-01',
            payee_name: 'Payee',
            amount: 100000,
            approved: false,
            cleared: TransactionClearedStatus.Uncleared,
        })

        const transactions: TransactionDetail[] = [transaction]

        const { result } = renderHook(() =>
            useTransactionList({
                transactions,
                pageSize: 1,
                approveTransaction: mockApproveTransaction,
                unapproveTransaction: mockUnapproveTransaction,
                clearTransaction: mockClearTransaction,
                unclearTransaction: mockUnclearTransaction,
            })
        )

        act(() => {
            inputHandler('', { upArrow: true })
        })

        expect(result.current.selected).toBeUndefined()

        act(() => {
            inputHandler('', { downArrow: true })
        })

        expect(result.current.selected).toBe(0)

        act(() => {
            inputHandler('', { downArrow: true })
        })

        expect(result.current.selected).toBe(0)
    })

    it('should not paginate beyond the bounds', () => {
        const mockApproveTransaction = vi.fn()
        const mockUnapproveTransaction = vi.fn()
        const mockClearTransaction = vi.fn()
        const mockUnclearTransaction = vi.fn()
        let inputHandler: (input: string, key: unknown) => void = () => {}

        when(vi.mocked(useInput))
            .calledWith(expect.any(Function))
            .thenDo((handler) => {
                inputHandler = handler
            })

        const transaction1 = mock<TransactionDetail>({
            id: '1',
            date: '2023-09-01',
        })
        const transaction2 = mock<TransactionDetail>({
            id: '2',
            date: '2023-09-02',
        })
        const transactions: TransactionDetail[] = [transaction1, transaction2]

        const { result } = renderHook(() =>
            useTransactionList({
                transactions,
                pageSize: 2,
                approveTransaction: mockApproveTransaction,
                unapproveTransaction: mockUnapproveTransaction,
                clearTransaction: mockClearTransaction,
                unclearTransaction: mockUnclearTransaction,
            })
        )

        act(() => {
            inputHandler('', { rightArrow: true })
        })

        expect(result.current.start).toBe(0)
        expect(result.current.end).toBe(2)

        act(() => {
            inputHandler('', { leftArrow: true })
        })

        expect(result.current.start).toBe(0)
        expect(result.current.end).toBe(2)
    })

    it('should not respond to unrecognized keys', () => {
        const mockApproveTransaction = vi.fn()
        const mockUnapproveTransaction = vi.fn()
        const mockClearTransaction = vi.fn()
        const mockUnclearTransaction = vi.fn()
        let inputHandler: (input: string, key: unknown) => void = () => {}

        when(vi.mocked(useInput))
            .calledWith(expect.any(Function))
            .thenDo((handler) => {
                inputHandler = handler
            })

        const transaction = mock<TransactionDetail>({
            id: '1',
            date: '2023-09-01',
            approved: false,
            cleared: TransactionClearedStatus.Uncleared,
        })

        const transactions: TransactionDetail[] = [transaction]

        renderHook(() =>
            useTransactionList({
                transactions,
                pageSize: 1,
                approveTransaction: mockApproveTransaction,
                unapproveTransaction: mockUnapproveTransaction,
                clearTransaction: mockClearTransaction,
                unclearTransaction: mockUnclearTransaction,
            })
        )

        act(() => {
            inputHandler('x', {})
        })

        expect(mockApproveTransaction).not.toHaveBeenCalled()
        expect(mockUnapproveTransaction).not.toHaveBeenCalled()
        expect(mockClearTransaction).not.toHaveBeenCalled()
        expect(mockUnclearTransaction).not.toHaveBeenCalled()
    })

    it('should handle pressing down arrow beyond list length', () => {
        const mockApproveTransaction = vi.fn()
        const mockUnapproveTransaction = vi.fn()
        const mockClearTransaction = vi.fn()
        const mockUnclearTransaction = vi.fn()
        let inputHandler: (input: string, key: unknown) => void = () => {}

        when(vi.mocked(useInput))
            .calledWith(expect.any(Function))
            .thenDo((handler) => {
                inputHandler = handler
            })

        const transaction1 = mock<TransactionDetail>({ id: '1' })
        const transaction2 = mock<TransactionDetail>({ id: '2' })
        const transactions: TransactionDetail[] = [transaction1, transaction2]

        const { result } = renderHook(() =>
            useTransactionList({
                transactions,
                pageSize: 2,
                approveTransaction: mockApproveTransaction,
                unapproveTransaction: mockUnapproveTransaction,
                clearTransaction: mockClearTransaction,
                unclearTransaction: mockUnclearTransaction,
            })
        )

        act(() => {
            inputHandler('', { downArrow: true })
        })

        act(() => {
            inputHandler('', { downArrow: true })
        })

        act(() => {
            inputHandler('', { downArrow: true })
        })

        expect(result.current.selected).toBe(1) // Should stay at last item
    })

    it('should format zero amounts correctly', () => {
        const mockApproveTransaction = vi.fn()
        const mockUnapproveTransaction = vi.fn()
        const mockClearTransaction = vi.fn()
        const mockUnclearTransaction = vi.fn()

        const transaction = mock<TransactionDetail>({
            id: '1',
            date: '2023-09-01',
            amount: 0,
            payee_name: '',
            approved: false,
            cleared: TransactionClearedStatus.Uncleared,
        })

        const transactions: TransactionDetail[] = [transaction]

        const { result } = renderHook(() =>
            useTransactionList({
                transactions,
                pageSize: 1,
                approveTransaction: mockApproveTransaction,
                unapproveTransaction: mockUnapproveTransaction,
                clearTransaction: mockClearTransaction,
                unclearTransaction: mockUnclearTransaction,
            })
        )

        expect(result.current.tableRows).toEqual([
            {
                date: expect.any(String),
                payee: '',
                amount: '£0.00',
                approved: { color: 'red', value: 'U' },
                cleared: { color: 'red', value: 'U' },
            },
        ])
    })

    it('should correctly map Reconciled transactions', () => {
        const mockApproveTransaction = vi.fn()
        const mockUnapproveTransaction = vi.fn()
        const mockClearTransaction = vi.fn()
        const mockUnclearTransaction = vi.fn()

        const transaction = mock<TransactionDetail>({
            id: '1',
            date: '2023-09-01',
            payee_name: 'Payee',
            amount: 100000,
            approved: true,
            cleared: TransactionClearedStatus.Reconciled,
        })

        const transactions: TransactionDetail[] = [transaction]

        const { result } = renderHook(() =>
            useTransactionList({
                transactions,
                pageSize: 10,
                approveTransaction: mockApproveTransaction,
                unapproveTransaction: mockUnapproveTransaction,
                clearTransaction: mockClearTransaction,
                unclearTransaction: mockUnclearTransaction,
            })
        )

        expect(result.current.tableRows).toEqual([
            {
                date: expect.any(String),
                payee: 'Payee',
                amount: '£100.00',
                approved: { color: 'green', value: 'A' },
                cleared: { color: 'green', value: 'R' },
            },
        ])
    })

    it('should handle empty transactions array', () => {
        const mockApproveTransaction = vi.fn()
        const mockUnapproveTransaction = vi.fn()
        const mockClearTransaction = vi.fn()
        const mockUnclearTransaction = vi.fn()

        const transactions: TransactionDetail[] = []

        const { result } = renderHook(() =>
            useTransactionList({
                transactions,
                pageSize: 10,
                approveTransaction: mockApproveTransaction,
                unapproveTransaction: mockUnapproveTransaction,
                clearTransaction: mockClearTransaction,
                unclearTransaction: mockUnclearTransaction,
            })
        )

        expect(result.current.tableRows).toEqual([])
        expect(result.current.start).toBe(0)
        expect(result.current.end).toBe(0)
        expect(result.current.selected).toBeUndefined()
    })

    it('should call clearTransaction when "c" is pressed and transaction is uncleared', () => {
        const mockApproveTransaction = vi.fn()
        const mockUnapproveTransaction = vi.fn()
        const mockClearTransaction = vi.fn()
        const mockUnclearTransaction = vi.fn()
        let inputHandler: (input: string, key: unknown) => void = () => {}

        when(vi.mocked(useInput))
            .calledWith(expect.any(Function))
            .thenDo((handler) => {
                inputHandler = handler
            })

        const transaction = mock<TransactionDetail>({
            id: '1',
            date: '2023-09-01',
            payee_name: 'Payee 1',
            amount: 100000,
            approved: false,
            cleared: TransactionClearedStatus.Uncleared,
        })

        const transactions: TransactionDetail[] = [transaction]

        renderHook(() =>
            useTransactionList({
                transactions,
                pageSize: 1,
                approveTransaction: mockApproveTransaction,
                unapproveTransaction: mockUnapproveTransaction,
                clearTransaction: mockClearTransaction,
                unclearTransaction: mockUnclearTransaction,
            })
        )

        act(() => {
            inputHandler('', { downArrow: true })
        })

        act(() => {
            inputHandler('c', {})
        })

        expect(mockClearTransaction).toHaveBeenCalledWith('1')
    })

    it('should call unclearTransaction when "c" is pressed and transaction is cleared', () => {
        const mockApproveTransaction = vi.fn()
        const mockUnapproveTransaction = vi.fn()
        const mockClearTransaction = vi.fn()
        const mockUnclearTransaction = vi.fn()
        let inputHandler: (input: string, key: unknown) => void = () => {}

        when(vi.mocked(useInput))
            .calledWith(expect.any(Function))
            .thenDo((handler) => {
                inputHandler = handler
            })

        const transaction = mock<TransactionDetail>({
            id: '2',
            date: '2023-09-02',
            payee_name: 'Payee 2',
            amount: 200000,
            approved: true,
            cleared: TransactionClearedStatus.Cleared,
        })

        const transactions: TransactionDetail[] = [transaction]

        renderHook(() =>
            useTransactionList({
                transactions,
                pageSize: 1,
                approveTransaction: mockApproveTransaction,
                unapproveTransaction: mockUnapproveTransaction,
                clearTransaction: mockClearTransaction,
                unclearTransaction: mockUnclearTransaction,
            })
        )

        // Select the transaction
        act(() => {
            inputHandler('', { downArrow: true })
        })

        act(() => {
            inputHandler('c', {})
        })

        expect(mockUnclearTransaction).toHaveBeenCalledWith('2')
    })
})
