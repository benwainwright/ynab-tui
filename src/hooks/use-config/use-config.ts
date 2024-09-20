import { ONE_PASSWORD_REFERENCE } from '@constants'
import { onePasswordAuthStrategy } from '@core'
import { AuthStrategy, Config } from '@types'

export const useConfig = (): Config => {
  return { apiAuthStrategy: onePasswordAuthStrategy(ONE_PASSWORD_REFERENCE) }
}
