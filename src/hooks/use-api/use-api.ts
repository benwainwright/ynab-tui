import { useContext, useEffect, useState } from 'react'
import { API } from 'ynab'
import { ConfigContext } from '@contexts'
import { addLoadingMiddleware } from './add-loading-middleware.ts'

let apiCache: API | undefined

type LoadingMap = Record<string, boolean>

export const useApi = () => {
    const [api, setApi] = useState<API | undefined>(apiCache)
    const [loading, setLoading] = useState<LoadingMap>({})
    const { config } = useContext(ConfigContext)

    const loadingLabels = Object.keys(loading)

    const isCurrentlyLoading =
        loadingLabels.length > 0 ? loadingLabels[0] : undefined

    const startLoading = (name: string) => {
        setLoading((prev) => ({ ...prev, [name]: true }))
    }

    const stopLoading = (name: string) => {
        setLoading((prev) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [name]: toRemove, ...rest } = prev
            return rest
        })
    }

    useEffect(() => {
        if (config && !api) {
            const { apiAuthStrategy } = config
            const asyncContext = async () => {
                startLoading('token')
                const token = await apiAuthStrategy()
                stopLoading('token')

                const api = addLoadingMiddleware(
                    new API(token),
                    startLoading,
                    stopLoading
                )

                apiCache = api
                setApi(api)
            }

            void asyncContext()
        }
    }, [api, config])

    return { api, isCurrentlyLoading, loading }
}
