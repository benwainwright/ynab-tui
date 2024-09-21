import { useApi } from '@hooks'
import { ApiContext } from './api-context.ts'

interface ApiProviderProps {
  children: React.ReactNode
}

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const api = useApi()
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}
