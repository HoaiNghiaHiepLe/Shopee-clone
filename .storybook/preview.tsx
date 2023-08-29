import type { Preview } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from '../src/contexts/app.context'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from '../src/components/ErrorBoundary'
import { withThemeByDataAttribute } from '@storybook/addon-styling'
import '../src/index.css'
import React from 'react'
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark'
    },
    defaultTheme: 'light',
    attributeName: 'data-mode'
  }),
  (Story) => (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <HelmetProvider>
            <ErrorBoundary>
              <Story />
            </ErrorBoundary>
          </HelmetProvider>
        </AppProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
]

export default preview
