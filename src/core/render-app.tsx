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
      <BudgetProvider>
        <ConfigProvider injectedConfig={config}>
          <ApiProvider>{element}</ApiProvider>
        </ConfigProvider>
      </BudgetProvider>,
    ]

    const instance = render(...args)
    await instance.waitUntilExit()
    return instance
  } catch (error) {
    console.log(error)
    return undefined
  }
}
