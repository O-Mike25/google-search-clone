import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import './global.css'
import App from './App.tsx'
import { ResultContextProvider } from './contexts/ResultContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ResultContextProvider>
      <Router>
        <App />
      </Router>
    </ResultContextProvider>
  </StrictMode>,
)
