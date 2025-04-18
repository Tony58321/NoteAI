import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Login from './Login.jsx'
import Note from './Note.jsx'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <App/>
  </StrictMode>,
)
