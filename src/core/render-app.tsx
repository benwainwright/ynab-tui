import { ApiProvider, BudgetProvider, ConfigProvider } from '@contexts'
import { Config } from '@types'
import { render } from 'ink'

export const renderApp = async (
  config: Partial<Config>,
  ...args: Parameters<typeof render>
) => {
  try {
    const [element, ...rest] = args

    const newArgs = [
      <ConfigProvider injectedConfig={config}>
        <ApiProvider>
          <BudgetProvider>{element}</BudgetProvider>
        </ApiProvider>
      </ConfigProvider>,
      ...rest,
    ] as const

    const instance = render(...newArgs)
    await instance.waitUntilExit()
    return instance
  } catch (error) {
    console.log(error)
    return undefined
  }
}
