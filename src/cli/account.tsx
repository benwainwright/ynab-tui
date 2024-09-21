import { command, option, string } from 'cmd-ts'
import { render } from 'ink'
import { Account } from '@components'
import { globalOptions } from './global-options.ts'
import { BudgetProvider } from 'src/contexts/budget-context/budget-provider.tsx'
import { getConfig, renderApp } from '@core'

export const account = command({
    name: 'account',
    description: 'View an account and clear/approve transactions',
    args: {
        name: option({
            long: 'name',
            short: 'n',
            type: string,
            description: 'The name of the account',
        }),
        ...globalOptions,
    },
    handler: async (args) => {
        const config = getConfig({ token: args.token })
        await renderApp(config, <Account name={args.name} />)
    },
})
