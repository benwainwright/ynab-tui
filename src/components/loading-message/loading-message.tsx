import { Box, Text } from 'ink'
import Spinner from 'ink-spinner'

interface LoadingMessageProps {
    message: string[]
    loading: boolean
}

export const LoadingMessage = ({ message, loading }: LoadingMessageProps) => {
    return loading ? (
        <Box>
            <Spinner type="dots" />
            <Text color="green"> Loading {message.join(', ')}</Text>
        </Box>
    ) : (
        <Box>
            <Text color="grey">Loading complete...</Text>
        </Box>
    )
}
