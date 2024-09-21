import { useContext, useEffect, useState } from 'react'
import { API } from 'ynab'
import { ConfigContext } from '@contexts'

let apiCache: API | undefined

export const useApi = () => {
  const [api, setApi] = useState<API | undefined>(apiCache)
  const { config } = useContext(ConfigContext)

  useEffect(() => {
    if (config && !api) {
      const { apiAuthStrategy } = config
      const asyncContext = async () => {
        try {
          const token = await apiAuthStrategy()
          const api = new API(token)
          apiCache = api
          setApi(api)
        } catch (e) {
          console.log(e)
        }
      }

      void asyncContext()
    }
  }, [api, config])

  return { api }
}
