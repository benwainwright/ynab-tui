import { mock } from "vitest-mock-extended";
import { getFirstBudget } from "./get-first-budget.js";
vi.mock('ynab');
afterEach(()=>{
    vi.resetAllMocks();
});
describe('get first budget', ()=>{
    it('given a working API will call the API and return the first budget it finds', async ()=>{
        const mockBudgets = mock();
        const mockApi = mock({
            budgets: mockBudgets
        });
        const budgetOne = mock();
        const budgetTwo = mock();
        const response = mock({
            data: {
                budgets: [
                    budgetOne,
                    budgetTwo
                ]
            }
        });
        mockBudgets.getBudgets.mockResolvedValue(response);
        const budget = await getFirstBudget(mockApi);
        expect(budget).toEqual(budgetOne);
    });
});

//# sourceMappingURL=get-first-budget.spec.js.map