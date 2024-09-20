import { API } from "ynab";
import { getApi } from "./get-api.js";
import { when } from "vitest-when";
import { mock } from "vitest-mock-extended";
vi.mock('ynab');
afterEach(()=>{
    vi.resetAllMocks();
});
describe('get api', ()=>{
    it('calls the auth strategy, passes it the API then returns the result', async ()=>{
        const authStrategy = vi.fn().mockResolvedValue('token');
        const mockApi = mock();
        when(vi.mocked(API)).calledWith('token').thenReturn(mockApi);
        const result = await getApi(authStrategy);
        expect(result).toBe(mockApi);
    });
});

//# sourceMappingURL=get-api.spec.js.map