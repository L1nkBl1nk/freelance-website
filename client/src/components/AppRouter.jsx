import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { LOGIN_ROUTE } from '../utils/consts'
import { useContext } from 'react'
import { Context } from '../main'

const AppRouter = () =>{
    const {user} = useContext(Context)

    return(
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
        </Routes>
    )
}

export default AppRouter