import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'reset-css/reset.css'

//全局样式
import '@/assets/styles/global.scss'

import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
