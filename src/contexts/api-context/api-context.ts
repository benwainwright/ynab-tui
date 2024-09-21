import { createContext } from 'react'
import { API } from 'ynab'

export const ApiContext = createContext<{ api: API | undefined }>({
  api: undefined,
})
