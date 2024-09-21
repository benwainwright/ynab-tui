import { command, option, string } from 'cmd-ts'
import { Account } from '@components'
import { globalOptions } from './global-options.ts'
import { getConfig, renderApp } from '@core'

export const account = command({
    name: 'account',
    description: 'List account transactions and clear/approve them',
    args: {
        name: option({
            long: 'name',
            short: 'n',
            type: string,
            description: 'Name of the account you wish to view',
        }),
        ...globalOptions,
    },
    handler: async (args) => {
        const config = getConfig({ token: args.token })
        await renderApp(config, <Account name={args.name} />)
    },
})
