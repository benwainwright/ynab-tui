import { jsx as _jsx } from "react/jsx-runtime";
import { Account } from "../components/index.js";
import { run } from "cmd-ts";
import { account } from "./account.js";
import { render } from "ink";
import { mock } from "vitest-mock-extended";
import { when } from "vitest-when";
vi.mock('ink');
vi.mock('@components');
afterEach(()=>{
    vi.resetAllMocks();
});
describe('account', ()=>{
    it('renders the account component', async ()=>{
        const waitUntilExit = ()=>Promise.resolve();
        const mockInstance = mock({
            waitUntilExit
        });
        when(vi.mocked(render)).calledWith(/*#__PURE__*/ _jsx(Account, {
            name: "foo-bar"
        })).thenReturn(mockInstance);
        await run(account, [
            '--name',
            'foo-bar'
        ]);
        expect(render).toBeCalledWith(/*#__PURE__*/ _jsx(Account, {
            name: "foo-bar"
        }));
    });
});

//# sourceMappingURL=account.spec.js.map