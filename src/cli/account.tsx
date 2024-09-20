import { command, option, string } from 'cmd-ts'
import { render } from 'ink'
import { Account } from '@components'

export const account = command({
  name: 'account',
  args: {
    name: option({
      long: 'name',
      type: string,
    }),
  },
  handler: async (args) => {
    const { waitUntilExit } = render(<Account name={args.name} />)
    await waitUntilExit()
  },
})
