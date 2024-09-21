import { Account } from '@components'
import { run } from 'cmd-ts'
import { account } from './account.tsx'
import { Instance } from 'ink'
import { mock } from 'vitest-mock-extended'
import { when } from 'vitest-when'
import { renderApp, getConfig } from '@core'

vi.mock('ink')
vi.mock('@components')
vi.mock('@core')

afterEach(() => {
  vi.resetAllMocks()
})

describe('account', () => {
  it('renders the account component', async () => {
    const waitUntilExit = () => Promise.resolve()

    const mockInstance = mock<Instance>({ waitUntilExit })

    when(vi.mocked(getConfig)).calledWith({}).thenReturn({})

    when(vi.mocked(renderApp))
      .calledWith({}, <Account name="foo-bar" />)
      .thenResolve()

    await run(account, ['--name', 'foo-bar'])

    expect(renderApp).toBeCalledWith({}, <Account name="foo-bar" />)
  })
})
