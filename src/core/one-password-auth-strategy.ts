import { read } from '@1password/op-js'
import { AuthStrategy } from '@types'

export const onePasswordAuthStrategy = (
  secretReference: string,
): AuthStrategy => {
  // eslint-disable-next-line @typescript-eslint/require-await
  return async () => read.parse(secretReference)
}
