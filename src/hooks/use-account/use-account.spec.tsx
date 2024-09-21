import { renderHook, waitFor } from '@testing-library/react'
import { useAccount } from './use-account.tsx'
import { mock } from 'vitest-mock-extended'
import {
  Account,
  API,
  BudgetSummary,
  TransactionDetail,
  TransactionsApi,
  TransactionsResponse,
} from 'ynab'
import { useApi, useBudget } from '@hooks'
import { when } from 'vitest-when'
import { ApiContext, BudgetContext } from '@contexts'
import { Box } from 'ink'

vi.mock('@hooks')

beforeEach(() => {
  vi.resetAllMocks()
})

describe('use account', () => {
  it('should return the transactions for the given account given the account id', async () => {
    const mockTransactionsApi = mock<TransactionsApi>()

    const transactions: TransactionDetail[] = [mock(), mock()]

    const transactionsResponse = mock<TransactionsResponse>({
      data: {
        transactions,
      },
    })

    const account = mock<Account>({ name: 'Current', id: 'account-123' })

    const budget = mock<BudgetSummary>({
      id: 'budget-123',
      accounts: [account],
    })

    when(mockTransactionsApi.getTransactionsByAccount)
      .calledWith('budget-123', 'account-123')
      .thenResolve(transactionsResponse)

    const mockApi = mock<API>({
      transactions: mockTransactionsApi,
    })

    vi.mocked(useApi).mockReturnValue({ api: mockApi })

    const { result } = renderHook(() => useAccount({ name: 'Current' }), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <Box>
          <BudgetContext.Provider value={{ budget, refresh: vi.fn() }}>
            <ApiContext.Provider value={{ api: mockApi }}>
              {children}
            </ApiContext.Provider>
          </BudgetContext.Provider>
        </Box>
      ),
    })

    expect(result.current.transactions).toBeUndefined()

    await waitFor(() => {
      expect(result.current.transactions).toEqual(transactions)
    })
  })
})
