import { Box, Text } from 'ink'
import Spinner from 'ink-spinner'

interface LoadingProps {
  loaded: boolean
  name: string
  children: React.ReactNode
}

export const Loading = ({ loaded, children, name }: LoadingProps) => {
  return !loaded ? (
    <Box>
      <Text color="green">
        <Spinner type="dots" /> Loading {name}
      </Text>
    </Box>
  ) : (
    <>{children}</>
  )
}
