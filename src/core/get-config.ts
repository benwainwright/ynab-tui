import { APP_NAME } from '@constants'
import { Config } from '@types'
import { rcFile } from 'rc-config-loader'

function loadRcFile(rcFileName: string): Partial<Config> {
    try {
        const results = rcFile<Config>(rcFileName)
        if (!results) {
            return {}
        }
        return results.config
    } catch {
        return {}
    }
}

export const getConfig = ({ token }: { token?: string }): Partial<Config> => {
    const rcConfig = loadRcFile(APP_NAME)

    const tokenConfig: Partial<Config> = token
        ? { apiAuthStrategy: () => Promise.resolve(token) }
        : {}

    return { ...rcConfig, ...tokenConfig }
}
