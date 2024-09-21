import { renderHook, waitFor } from '@testing-library/react'
import { mock } from 'vitest-mock-extended'
import { API } from 'ynab'
import { when } from 'vitest-when'

beforeEach(() => {
  vi.resetAllMocks()
  vi.resetModules()
})

describe('useApi', () => {
  it('should return the api the first time it is called', async () => {

    vi.doMock('ynab')
    vi.doMock('@hooks')

    const { useApi } = await import('./use-api.ts')
    const { API } = await import('ynab')
    const { useConfig } = await import('@hooks')

    const mockAuthStrategy = vi.fn().mockResolvedValue('token')

    vi.mocked(useConfig).mockReturnValue({
      apiAuthStrategy: mockAuthStrategy,
    })

    const mockApi = mock<API>()

    when(vi.mocked(API)).calledWith('token').thenReturn(mockApi)

    const { result } = renderHook(() => useApi())

    expect(result.current.api).toBeUndefined()

    await waitFor(() => {
      expect(result.current.api).toEqual(mockApi)
    })
  })

  it('should only load the API one', async () => {

    vi.doMock('ynab')
    vi.doMock('@hooks')

    const { useApi } = await import('./use-api.ts')
    const { API } = await import('ynab')
    const { useConfig } = await import('@hooks')

    const mockAuthStrategy = vi.fn().mockResolvedValue('token')

    vi.mocked(useConfig).mockReturnValue({
      apiAuthStrategy: mockAuthStrategy,
    })

    const mockApi = mock<API>()

    when(vi.mocked(API)).calledWith('token').thenReturn(mockApi)

    renderHook(() => useApi())

    await waitFor(() => {
      expect(API).toHaveBeenCalledTimes(1)
    })

    const { result } = renderHook(() => useApi())

    await waitFor(() => {
      expect(result.current.api).not.toBeUndefined()
      expect(API).toHaveBeenCalledTimes(1)
    })
  })
})
