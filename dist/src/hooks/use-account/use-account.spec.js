import { renderHook, waitFor } from "@testing-library/react";
import { useAccount } from "./use-account.js";
import { mock } from "vitest-mock-extended";
import { useApi, useBudget } from "../index.js";
import { when } from "vitest-when";
vi.mock('@hooks');
beforeEach(()=>{
    vi.resetAllMocks();
});
describe('useTransactions', ()=>{
    it('should return the transactions for the given account given the account id', async ()=>{
        const mockTransactionsApi = mock();
        const transactions = [
            mock(),
            mock()
        ];
        const transactionsResponse = mock({
            data: {
                transactions
            }
        });
        const account = mock({
            name: 'Current',
            id: 'account-123'
        });
        const budget = mock({
            id: 'budget-123',
            accounts: [
                account
            ]
        });
        when(mockTransactionsApi.getTransactionsByAccount).calledWith('budget-123', 'account-123').thenResolve(transactionsResponse);
        const mockApi = mock({
            transactions: mockTransactionsApi
        });
        when(useBudget).calledWith({
            includeAccounts: true
        }).thenReturn({
            budget
        });
        vi.mocked(useApi).mockReturnValue({
            api: mockApi
        });
        const { result } = renderHook(()=>useAccount({
                name: 'Current'
            }));
        expect(result.current.transactions).toBeUndefined();
        await waitFor(()=>{
            expect(result.current.transactions).toEqual(transactions);
        });
    });
});

//# sourceMappingURL=use-account.spec.js.map