import { app } from '@cli'
import { run } from 'cmd-ts'

await run(app, process.argv.slice(2))
