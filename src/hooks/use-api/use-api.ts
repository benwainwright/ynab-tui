import { useEffect, useState } from 'react'
import { API } from 'ynab'
import { useConfig } from '@hooks'

let apiCache: API | undefined

export const useApi = () => {
  const [api, setApi] = useState<API | undefined>(apiCache)
  const { apiAuthStrategy } = useConfig()

  useEffect(() => {
    const asyncContext = async () => {
      const token = await apiAuthStrategy()
      const api = new API(token)
      apiCache = api
      setApi(api)
    }

    if (!api) {
      void asyncContext()
    }
  }, [])

  return { api }
}
