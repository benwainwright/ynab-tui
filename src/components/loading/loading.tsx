import { Box, Text } from 'ink'
import Spinner from 'ink-spinner'

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
  return !allHere ? (
    <Box>
      <Text color="green">
        <Spinner type="dots" /> Loading {name}
      </Text>
    </Box>
  ) : (
    <>{children(data as RemoveUndefined<T>)}</>
  )
}
