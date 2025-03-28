import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TanStackQueryProvider } from './lib/tanstack-query'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanStackQueryProvider>
      <App />
    </TanStackQueryProvider>
  </StrictMode>,
)
