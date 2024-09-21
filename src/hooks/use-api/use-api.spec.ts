import { renderHook, waitFor } from '@testing-library/react'
import { mock } from 'vitest-mock-extended'
import { API } from 'ynab'
import { when } from 'vitest-when'
import { Config } from '@types'
import { ConfigContext } from '@contexts'

beforeEach(() => {
    vi.resetAllMocks()
    vi.resetModules()
})

describe('useApi', () => {
    it('should return the api the first time it is called', async () => {
        vi.doMock('./add-loading-middleware.ts')
        vi.doMock('ynab')
        vi.doMock('@hooks')
        vi.doMock(import('react'), async (originalImport) => {
            const original = await originalImport()

            return {
                ...original,
                useContext: vi.fn(),
            }
        })
        vi.doMock('./add-loading-middleware.ts')
        const { addLoadingMiddleware } = await import(
            './add-loading-middleware.ts'
        )

        vi.mocked(addLoadingMiddleware).mockImplementation((api) => api)

        const { useContext } = await import('react')
        const { useApi } = await import('./use-api.ts')
        const { API } = await import('ynab')
        const { useConfig } = await import('@hooks')

        const mockAuthStrategy = vi.fn().mockResolvedValue('token')

        vi.mocked(useConfig).mockReturnValue({
            apiAuthStrategy: mockAuthStrategy,
        })

        when(vi.mocked(useContext<{ config: Config | undefined }>))
            .calledWith(ConfigContext)
            .thenReturn({
                config: { apiAuthStrategy: () => Promise.resolve('token') },
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
        vi.doMock(import('react'), async (originalImport) => {
            const original = await originalImport()

            return {
                ...original,
                useContext: vi.fn(),
            }
        })

        vi.doMock('./add-loading-middleware.ts')
        const { addLoadingMiddleware } = await import(
            './add-loading-middleware.ts'
        )

        vi.mocked(addLoadingMiddleware).mockImplementation((api) => api)
        const { useContext } = await import('react')
        const { useApi } = await import('./use-api.ts')
        const { API } = await import('ynab')

        when(vi.mocked(useContext<{ config: Config | undefined }>))
            .calledWith(ConfigContext)
            .thenReturn({
                config: { apiAuthStrategy: () => Promise.resolve('token') },
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
