import { LoadingMessage } from '@components'
import { ApiContext } from '@contexts'
import { Box, Text } from 'ink'
import Spinner from 'ink-spinner'
import { useContext } from 'react'

type RemoveUndefined<T> = {
    [K in keyof T]: Exclude<T[K], undefined>
}

interface LoadingProps<T extends Record<string, unknown | undefined>> {
    data: T
    name: string
    children: (data: RemoveUndefined<T>) => React.ReactNode
}

export const Loading = <T extends Record<string, unknown | undefined>>({
    data,
    children,
    name,
}: LoadingProps<T>) => {
    const allHere = Object.values(data).every((value) => Boolean(value))
    const { isCurrentlyLoading, loading } = useContext(ApiContext)
    return (
        <>
            {allHere && children(data as RemoveUndefined<T>)}
            {
                <LoadingMessage
                    loading={!allHere || Boolean(isCurrentlyLoading)}
                    message={Object.keys(loading)}
                />
            }
        </>
    )
}
