import { Config } from '@types'

export const getConfig = ({ token }: { token?: string }): Partial<Config> => {
  const tokenConfig: Partial<Config> = token
    ? { apiAuthStrategy: () => Promise.resolve(token) }
    : {}

  return tokenConfig
}
