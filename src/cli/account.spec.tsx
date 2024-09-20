import { Account } from '@components'
import { run } from 'cmd-ts'
import { account } from './account.tsx'
import { Instance, render } from 'ink'
import { mock } from 'vitest-mock-extended'
import { when } from 'vitest-when'

vi.mock('ink')
vi.mock('@components')

afterEach(() => {
  vi.resetAllMocks()
})

describe('account', () => {
  it('renders the account component', async () => {
    const waitUntilExit = () => Promise.resolve()

    const mockInstance = mock<Instance>({ waitUntilExit })

    when(vi.mocked(render))
      .calledWith(<Account name="foo-bar" />)
      .thenReturn(mockInstance)

    await run(account, ['--name', 'foo-bar'])

    expect(render).toBeCalledWith(<Account name="foo-bar" />)
  })
})
