import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ContextProvider } from './contextApi/ContextApi.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();
// StrictMode is a tool for highlighting potential problems in an application. It activates additional checks and warnings for its descendants.
createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <QueryClientProvider client= {queryClient}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
