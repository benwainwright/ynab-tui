import { renderHook, waitFor } from "@testing-library/react";
import { useBudget } from "./use-budget.js";
import { useApi, useConfig } from "../index.js";
import { mock } from "vitest-mock-extended";
vi.mock('@hooks');
vi.mock('@core');
beforeEach(()=>{
    vi.resetAllMocks();
});
describe('use budget', ()=>{
    it('starts off as undefined then loads in the budget', async ()=>{
        const mockAuthStrategy = vi.fn();
        vi.mocked(useConfig).mockReturnValue({
            apiAuthStrategy: mockAuthStrategy
        });
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
        vi.mocked(useApi).mockReturnValue({
            api: mockApi
        });
        const { result } = renderHook(()=>useBudget());
        expect(result.current.budget).toBeUndefined();
        await waitFor(()=>{
            expect(result.current.budget).toEqual(budgetOne);
        });
    });
});

//# sourceMappingURL=use-budget.spec.js.map