import { app } from "./cli/index.js";
import { run } from "cmd-ts";
vi.mock('@cli');
vi.mock('cmd-ts');
afterEach(()=>{
    vi.resetModules();
    vi.resetAllMocks();
    vi.unstubAllGlobals();
});
describe('entry point file', ()=>{
    it('should execute the cli with the app command and parse in the correct command line args', async ()=>{
        vi.stubGlobal('process', {
            argv: [
                'node',
                'entry.ts',
                'run',
                'thing'
            ]
        });
        await import("./entry.ts");
        expect(vi.mocked(run)).toHaveBeenCalledWith(app, [
            'run',
            'thing'
        ]);
    });
});

//# sourceMappingURL=entry.spec.js.map