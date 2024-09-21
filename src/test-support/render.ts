import { render as inkRender } from 'ink-testing-library'
import stripAnsi from 'strip-ansi'

export const stripRender: typeof inkRender = (...args) => {
  const result = inkRender(...args)

  return {
    ...result,
    lastFrame: () => {
      const frame = result.lastFrame()

      if (!frame) {
        return frame
      }

      return stripAnsi(frame)
    },
  }
}
