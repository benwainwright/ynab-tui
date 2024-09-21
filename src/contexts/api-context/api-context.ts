import { createContext } from 'react'
import { API } from 'ynab'

interface ApiContextType {
    api: API | undefined
    loading: Record<string, boolean>
    isCurrentlyLoading: string | undefined
}

export const ApiContext = createContext<ApiContextType>({
    api: undefined,
    loading: {},
    isCurrentlyLoading: undefined,
})
