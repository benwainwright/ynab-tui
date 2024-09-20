import { renderHook, waitFor } from '@testing-library/react'
import { useTransactions } from './use-transactions.ts'
import { mock } from 'vitest-mock-extended'
import {
  API,
  BudgetSummary,
  TransactionDetail,
  TransactionsApi,
  TransactionsResponse,
} from 'ynab'
import { useApi, useBudget } from '@hooks'
import { when } from 'vitest-when'

vi.mock('@hooks')

beforeEach(() => {
  vi.resetAllMocks()
})

describe('useTransactions', () => {
  it('should return the transactions for the given account given the account id', async () => {
    const mockTransactionsApi = mock<TransactionsApi>()

    const transactions: TransactionDetail[] = [mock(), mock()]

    const transactionsResponse = mock<TransactionsResponse>({
      data: {
        transactions,
      },
    })

    const budget = mock<BudgetSummary>({
      id: 'budget-123',
    })

    when(mockTransactionsApi.getTransactionsByAccount)
      .calledWith('budget-123', 'account-123')
      .thenResolve(transactionsResponse)

    const mockApi = mock<API>({
      transactions: mockTransactionsApi,
    })

    when(useBudget).calledWith().thenReturn({ budget })

    vi.mocked(useApi).mockReturnValue({ api: mockApi })

    const { result } = renderHook(() => useTransactions({ id: 'account-123' }))

    expect(result.current.transactions).toBeUndefined()
    
    await waitFor(() => {
      expect(result.current.transactions).toEqual(transactions)
    })
  })
})
