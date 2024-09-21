import { Config } from '@types'
import { createContext } from 'react'

export const ConfigContext = createContext<{ config: Config | undefined }>({
  config: undefined,
})
