import { useContext } from "react"
import { Context } from "../main"
import {Navbar as BootstrapNavbar, Container, Nav, Button, Image} from "react-bootstrap"
import { useNavigate, NavLink } from "react-router-dom"
import { APPLICATIONS_ROUTE, BIDS_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, ORDERS_ROUTE, PROFILE_ROUTE, PROJECTS_ROUTE, REGISTER_ROUTE } from "../utils/consts"
import {observer} from "mobx-react-lite"


const Navbar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    return(
        <>
      <BootstrapNavbar bg="dark" data-bs-theme="dark">
        <Container>
          <NavLink style={{color:'white', textDecoration:'none'}} to={MAIN_ROUTE}>Freelance Web</NavLink>
          <NavLink className={"ms-3"} style={{color:'white', textDecoration:'none'}} to={PROJECTS_ROUTE}>Projects</NavLink>
          {user.isAuth && (
            user.user?.role === 'client'
              ? <NavLink className={"ms-3"} style={{color:'white', textDecoration:'none'}} to={APPLICATIONS_ROUTE}>Applications</NavLink>
              : <NavLink className={"ms-3"} style={{color:'white', textDecoration:'none'}} to={BIDS_ROUTE}>Your Bids</NavLink>
          )}
          {user.isAuth && (
            <NavLink className={"ms-3"} style={{color:'white', textDecoration:'none'}} to={ORDERS_ROUTE}>Orders</NavLink>
          )}
          {user.isAuth ? 
          <Nav className="ms-auto">
            <Image
              className="me-3"
              width={35}
              height={35}
              roundedCircle
              src={user.profileImg || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='35' height='35'%3E%3Crect width='35' height='35' fill='%23dee2e6' rx='50'/%3E%3C/svg%3E"}
              style={{cursor: "pointer", objectFit: "cover"}}
              onClick={() => navigate(PROFILE_ROUTE)}
            />
            <Button variant={"outline-light"} onClick={() => {
                localStorage.removeItem('token')
                user.setIsAuth(false)
                user.setUser({})
                navigate(LOGIN_ROUTE)
            }}>Log out</Button>
          </Nav>
           : <Nav className="ms-auto">
            <Button variant={"outline-light"} onClick={() => navigate(REGISTER_ROUTE)}>Sign In</Button>
            <Button variant={"outline-light"} className="ms-3" onClick={() => navigate(LOGIN_ROUTE)}>Log In</Button>
          </Nav>
          }

        </Container>
      </BootstrapNavbar>
    </>
    )
})

export default Navbar