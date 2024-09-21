import { APP_NAME, APP_VERSION } from '@constants'
import { subcommands } from 'cmd-ts'
import { account } from './account.tsx'

export const app = subcommands({
    name: APP_NAME,
    version: APP_VERSION,
    description: 'A text-based YNAB client',
    cmds: {
        account,
    },
})
