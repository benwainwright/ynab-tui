import { command, run } from 'cmd-ts'
import { app } from './app.ts'
import { APP_NAME, APP_VERSION } from '@constants'
import { run as runCommand } from './run.ts'
import stripAnsi from 'strip-ansi'

vi.mock('./run.ts', () => {
  const mockCommand = command({
    name: 'run',
    args: {},
    handler: vi.fn(),
  })

  return {
    run: mockCommand,
  }
})

vi.spyOn(console, 'log')

beforeEach(() => {
  vi.resetAllMocks()
  vi.mocked(console.log).mockReset()
  vi.stubGlobal('process', {
    exit: vi.fn(),
  })
})

describe('the app command', () => {
  it('returns the correct version when supplied the --version flag', async () => {
    await run(app, ['--version'])

    expect(console.log).toHaveBeenCalledWith(APP_VERSION)
  })

  it('has been configured with the correct command', async () => {
    await run(app, ['run'])
    expect(runCommand.handler).toBeCalled()
  })

  it('returns the correct name when passing the --help', async () => {
    vi.spyOn(console, 'log')

    await run(app, ['--help'])

    const output = vi.mocked(console.log).mock.calls[0][0]

    expect(stripAnsi(output)).toEqual(`${APP_NAME} <subcommand>

where <subcommand> can be one of:

- run

For more help, try running \`${APP_NAME} <subcommand> --help\``)
  })
})
