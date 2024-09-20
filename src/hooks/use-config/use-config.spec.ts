import { ONE_PASSWORD_REFERENCE } from '@constants'
import { onePasswordAuthStrategy } from '@core'
import { AuthStrategy } from '@types'
import { mock } from 'vitest-mock-extended'
import { when } from 'vitest-when'
import { useConfig } from './use-config.ts'
vi.mock('@core')

describe('use config', () => {
  it('should return a config object with the op auth strategy', () => {
    const mockAuthStrategy = mock<AuthStrategy>()

    when(onePasswordAuthStrategy)
      .calledWith(ONE_PASSWORD_REFERENCE)
      .thenReturn(mockAuthStrategy)

    const config = useConfig()

    expect(config.apiAuthStrategy).toBe(mockAuthStrategy)
  })
})
