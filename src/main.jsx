import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Router from './routes/Router.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './context/AuthContext.js'


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={Router}/>
    </AuthProvider>
)
