import { API, Middleware } from 'ynab'

export const addLoadingMiddleware = (
    api: API | undefined,
    start: (name: string) => void,
    stop: (name: string) => void
) => {
    const makeMiddleware = (name: string): Middleware => {
        return {
            // eslint-disable-next-line @typescript-eslint/require-await
            pre: async () => {
                start(name)
            },
            // eslint-disable-next-line @typescript-eslint/require-await
            post: async ({ response }) => {
                console.log(response)
                if (response.status === 429) {
                    console.log('Rate limit')
                }
                stop(name)
            },

            // eslint-disable-next-line @typescript-eslint/require-await
            onError: async (context) => {
                console.log(context)
            },
        }
    }

    if (api) {
        return new Proxy(api, {
            get(target: API, prop: keyof API) {
                return target[prop].withMiddleware(
                    makeMiddleware(prop as string)
                )
            },
        })
    }
}
