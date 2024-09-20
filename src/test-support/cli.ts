// Shamelessly borrowed from https://www.lekoarts.de/garden/how-to-test-cli-output-in-jest-vitest/
import { join } from 'path'
import { createLogsMatcher } from './logs-matcher.ts'
import { execaSync } from 'execa'
import type { ExecaSyncError } from 'execa'

import strip from 'strip-ansi'

const builtCliLocation = join(__dirname, '..', 'dist', 'entry.js')

type CreateLogsMatcherReturn = ReturnType<typeof createLogsMatcher>

export type InvokeResult = [
  exitCode: number | undefined,
  logsMatcher: CreateLogsMatcherReturn,
]

export class CLI {
  public constructor(private readonly cwd: string) {}
  public invoke(args: Array<string>): InvokeResult {
    const NODE_ENV = 'production'
    try {
      const results = execaSync(
        process.execPath,
        [builtCliLocation].concat(args),
        {
          cwd: this.cwd,
          env: { NODE_ENV },
        },
      )
      return [
        results.exitCode,
        createLogsMatcher(
          strip(results.stderr.toString() + results.stdout.toString()),
        ),
      ]
    } catch (e) {
      const execaError = e as ExecaSyncError
      return [
        execaError.exitCode,
        createLogsMatcher(strip(execaError.stdout?.toString() || ``)),
      ]
    }
  }
}
