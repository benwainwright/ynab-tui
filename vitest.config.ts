import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    coverage: {
      include: ['src/**/*.ts'],
      thresholds: {
        functions: 100,
        lines: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
})
