import { ONE_PASSWORD_REFERENCE } from "../../constants.js";
import { onePasswordAuthStrategy } from "../../core/index.js";
import { mock } from "vitest-mock-extended";
import { when } from "vitest-when";
import { useConfig } from "./use-config.js";
vi.mock('@core');
describe('use config', ()=>{
    it('should return a config object with the op auth strategy', ()=>{
        const mockAuthStrategy = mock();
        when(onePasswordAuthStrategy).calledWith(ONE_PASSWORD_REFERENCE).thenReturn(mockAuthStrategy);
        const config = useConfig();
        expect(config.apiAuthStrategy).toBe(mockAuthStrategy);
    });
});

//# sourceMappingURL=use-config.spec.js.map