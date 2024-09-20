import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
const currentDirectory = dirname(fileURLToPath(import.meta.url))
const entry = join(currentDirectory, '..', 'dist', 'src', 'entry.js')

process.removeAllListeners('warning')

await import(entry)
