import { App } from '@components'
import { run } from 'cmd-ts'
import { run as runCommand } from './run.tsx'
import { Instance, render } from 'ink'
import { mock } from 'vitest-mock-extended'
import { when } from 'vitest-when'

vi.mock('ink')
vi.mock('@components')

afterEach(() => {
  vi.resetAllMocks()
})

describe('run', () => {
  it('renders the app', async () => {
    const waitUntilExit = () => Promise.resolve()

    const mockInstance = mock<Instance>({ waitUntilExit })

    when(vi.mocked(render))
      .calledWith(<App />)
      .thenReturn(mockInstance)

    await run(runCommand, [])

    expect(render).toBeCalledWith(<App />)
  })
})
