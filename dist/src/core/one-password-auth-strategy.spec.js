import { when } from "vitest-when";
import { onePasswordAuthStrategy } from "./one-password-auth-strategy.js";
import { read } from "@1password/op-js";
vi.mock('@1password/op-js');
afterEach(()=>{
    vi.resetAllMocks();
});
describe('OnePasswordAuthStrategy', ()=>{
    it('should return a function that returns the result of op.read', async ()=>{
        const strategy = onePasswordAuthStrategy('reference');
        when(vi.mocked(read.parse)).calledWith('reference').thenReturn('result');
        const result = await strategy();
        expect(result).toBe('result');
    });
});

//# sourceMappingURL=one-password-auth-strategy.spec.js.map