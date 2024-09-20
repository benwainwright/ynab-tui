import { mock } from 'vitest-mock-extended'
import { getFirstBudget } from './get-first-budget.ts'
import { API, BudgetsApi, BudgetSummary, BudgetSummaryResponse } from 'ynab'

vi.mock('ynab')

afterEach(() => {
  vi.resetAllMocks()
})

describe('get first budget', () => {
  it('given a working API will call the API and return the first budget it finds', async () => {
    const mockBudgets = mock<BudgetsApi>()

    const mockApi = mock<API>({
      budgets: mockBudgets,
    })

    const budgetOne = mock<BudgetSummary>()
    const budgetTwo = mock<BudgetSummary>()

    const response = mock<BudgetSummaryResponse>({
      data: {
        budgets: [budgetOne, budgetTwo],
      },
    })

    mockBudgets.getBudgets.mockResolvedValue(response)

    const budget = await getFirstBudget(mockApi)

    expect(budget).toEqual(budgetOne)
  })
})
