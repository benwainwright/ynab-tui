import { APP_NAME, APP_VERSION } from '@constants'
import { subcommands } from 'cmd-ts'
import { run } from './run.ts'

export const app = subcommands({
  name: APP_NAME,
  version: APP_VERSION,
  cmds: {
    run,
  },
})
