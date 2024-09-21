import { ONE_PASSWORD_REFERENCE } from '@constants'
import { ConfigContext } from './config-context.ts'
import { onePasswordAuthStrategy } from '@core'
import { Config } from '@types'

interface ConfigProviderProps {
  children: React.ReactNode
  injectedConfig?: Partial<Config>
}
export const ConfigProvider = ({
  children,
  injectedConfig,
}: ConfigProviderProps) => {
  const config = {
    apiAuthStrategy: onePasswordAuthStrategy(ONE_PASSWORD_REFERENCE),
    ...(injectedConfig ?? {}),
  }
  return (
    <ConfigContext.Provider value={{ config }}>
      {children}
    </ConfigContext.Provider>
  )
}
