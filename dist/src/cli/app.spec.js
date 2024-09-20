import { command, run } from "cmd-ts";
import { app } from "./app.js";
import { APP_NAME, APP_VERSION } from "../constants.js";
import { account } from "./account.js";
import stripAnsi from "strip-ansi";
vi.mock('./account.tsx', ()=>{
    const mockCommand = command({
        name: 'account',
        args: {},
        handler: vi.fn()
    });
    return {
        account: mockCommand
    };
});
vi.spyOn(console, 'log');
beforeEach(()=>{
    vi.resetAllMocks();
    vi.mocked(console.log).mockReset();
    vi.stubGlobal('process', {
        exit: vi.fn()
    });
});
describe('the app command', ()=>{
    it('returns the correct version when supplied the --version flag', async ()=>{
        await run(app, [
            '--version'
        ]);
        expect(console.log).toHaveBeenCalledWith(APP_VERSION);
    });
    it('has been configured with the correct command', async ()=>{
        await run(app, [
            'account'
        ]);
        expect(account.handler).toBeCalled();
    });
    it('returns the correct name when passing the --help', async ()=>{
        vi.spyOn(console, 'log');
        await run(app, [
            '--help'
        ]);
        const output = vi.mocked(console.log).mock.calls[0][0];
        expect(stripAnsi(output)).toEqual(`${APP_NAME} <subcommand>

where <subcommand> can be one of:

- account

For more help, try running \`${APP_NAME} <subcommand> --help\``);
    });
});

//# sourceMappingURL=app.spec.js.map