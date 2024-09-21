import { renderHook, waitFor } from '@testing-library/react'
import { useBudget } from './use-budget.ts'
import { useApi, useConfig } from '@hooks'
import { mock } from 'vitest-mock-extended'
import { API, BudgetsApi, BudgetSummary, BudgetSummaryResponse } from 'ynab'
import { useContext } from 'react'
import { when } from 'vitest-when'
import { ApiContext } from '@contexts'

vi.mock(import('react'), async (originalImport) => {
  const original = await originalImport()

  return {
    ...original,
    useContext: vi.fn(),
  }
})

vi.mock('@hooks')
vi.mock('@core')

beforeEach(() => {
  vi.resetAllMocks()
})

describe('use budget', () => {
  it('starts off as undefined then loads in the budget', async () => {
    const mockAuthStrategy = vi.fn()

    const mockBudgets = mock<BudgetsApi>()

    const mockApi = mock<API>({
      budgets: mockBudgets,
    })

    when(useContext<{ api: API | undefined }>)
      .calledWith(ApiContext)
      .thenReturn({ api: mockApi })

    vi.mocked(useConfig).mockReturnValue({
      apiAuthStrategy: mockAuthStrategy,
    })

    const budgetOne = mock<BudgetSummary>()
    const budgetTwo = mock<BudgetSummary>()

    const response = mock<BudgetSummaryResponse>({
      data: {
        budgets: [budgetOne, budgetTwo],
      },
    })

    mockBudgets.getBudgets.mockResolvedValue(response)

    vi.mocked(useApi).mockReturnValue({ api: mockApi })

    const { result } = renderHook(() => useBudget())

    expect(result.current.budget).toBeUndefined()

    await waitFor(() => {
      expect(result.current.budget).toEqual(budgetOne)
    })
  })
})
