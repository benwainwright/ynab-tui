import { option, optional, string } from 'cmd-ts'

export const globalOptions = {
  token: option({
    long: "'token",
    short: 't',
    description: 'A valid YNAB long lived access token',
    type: optional(string),
  }),
}
