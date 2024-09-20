import { onePasswordAuthStrategy, getApi, getFirstBudget } from '@core'

const auth = onePasswordAuthStrategy('op://Personal/YNAB/personal access token')

const api = await getApi(auth)
const budget = await getFirstBudget(api)
