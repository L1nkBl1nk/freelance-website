import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import Navbar from './components/Navbar'
import { useContext, useEffect, useState } from 'react'
import { Context } from './main'
import { checkAuth, getProfile } from './http/userApi'
import { Spinner } from 'react-bootstrap'

function App() {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth()
        .then(token => {
          const payload = JSON.parse(atob(token.split('.')[1]))
          user.setUser(payload)
          user.setIsAuth(true)
          return getProfile(payload.id)
        })
        .then(profile => {
          if (profile?.img) {
            user.setProfileImg(`${import.meta.env.VITE_API_URL}${profile.img}`)
          }
        })
        .catch(() => {
          localStorage.removeItem('token')
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Spinner animation="border" variant="primary" />
    </div>
  )

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
