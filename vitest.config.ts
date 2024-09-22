import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            enabled: true,
            reporter: ['html'],
            include: ['src/**/*.ts', 'src/**/*.tsx'],
            exclude: [
                'src/test-support/*.ts',
                'src/**/*.spec.ts',
                'src/**/*.spec.tsx',
            ],
            thresholds: {
                functions: 100,
                lines: 100,
                branches: 100,
                statements: 100,
            },
        },
    },
})
