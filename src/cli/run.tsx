import { command } from 'cmd-ts'
import { render } from 'ink'
import { App } from '@components'

export const run = command({
  name: 'run',
  args: {},
  handler: async () => {
    const { waitUntilExit } = render(<App />)
    await waitUntilExit()
  },
})
