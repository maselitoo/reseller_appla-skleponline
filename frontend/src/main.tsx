import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.tsx'

// Rejestracja Service Workera (PWA)
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Dostępna nowa wersja aplikacji. Zaktualizować?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('✅ Aplikacja gotowa do pracy offline')
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
