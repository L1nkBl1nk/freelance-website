import { createContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserService from './webService/UserService.jsx'
import ProjectService from './webService/ProjectService.jsx'

export const Context = createContext(null)

createRoot(document.getElementById('root')).render(
  <Context.Provider value={{
    user: new UserService(),
    project: new ProjectService()
  }}>
    <App />
  </Context.Provider>,
)
