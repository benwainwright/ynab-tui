// Shamelessly borrowed from https://www.lekoarts.de/garden/how-to-test-cli-output-in-jest-vitest/
import { join } from "path";
import { createLogsMatcher } from "./logs-matcher.js";
import { execaSync } from "execa";
import strip from "strip-ansi";
const builtCliLocation = join(__dirname, '..', 'dist', 'entry.js');
export class CLI {
    cwd;
    constructor(cwd){
        this.cwd = cwd;
    }
    invoke(args) {
        const NODE_ENV = 'production';
        try {
            const results = execaSync(process.execPath, [
                builtCliLocation
            ].concat(args), {
                cwd: this.cwd,
                env: {
                    NODE_ENV
                }
            });
            return [
                results.exitCode,
                createLogsMatcher(strip(results.stderr.toString() + results.stdout.toString()))
            ];
        } catch (e) {
            const execaError = e;
            return [
                execaError.exitCode,
                createLogsMatcher(strip(execaError.stdout?.toString() || ``))
            ];
        }
    }
}

//# sourceMappingURL=cli.js.map