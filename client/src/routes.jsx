import MainPage from "./pages/MainPage"
import Projects from './pages/Projects'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import OrderPage from './pages/OrderPage'
import Bids from './pages/Bids'
import ProjectPage from './pages/ProjectPage'
import UserProjects from './pages/UserProjects'
import Auth from './pages/Auth'
import { BIDS_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, ORDERPAGE_ROUTE, ORDERS_ROUTE, PROFILE_ROUTE, PROJECTPAGE_ROUTE, PROJECTS_ROUTE, REGISTER_ROUTE, USERPROJECTS_ROUTE } from "./utils/consts"


export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: ORDERS_ROUTE,
        Component: Orders
    },
    {
        path: ORDERPAGE_ROUTE,
        Component: OrderPage
    },
    {
        path: BIDS_ROUTE,
        Component: Bids
    },
    {
        path: PROJECTPAGE_ROUTE,
        Component: ProjectPage
    },
    {
        path: USERPROJECTS_ROUTE,
        Component: UserProjects
    },
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: PROJECTS_ROUTE,
        Component: Projects
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTER_ROUTE,
        Component: Auth
    },
]