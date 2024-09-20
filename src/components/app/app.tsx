import { Box, Text, useApp } from 'ink'
import { useEffect } from 'react'

export const App = () => {
  const { exit } = useApp()
  useEffect(() => {
    exit()
  }, [])
  return (
    <Box>
      <Text>Testing</Text>
    </Box>
  )
}
