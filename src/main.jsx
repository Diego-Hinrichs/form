import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EncuestaForm from './EncuestaForm';
import RespuestasPage from './RespuestasPage';
import { AppProvider } from './AppContext';
import App from './App'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>
  },
  {
    path:"/encuesta",
    element: <EncuestaForm/>
  },
  {
    path:"/respuestas",
    element: <RespuestasPage/>
  },
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router}/>
    </AppProvider>
  </React.StrictMode>,
)
