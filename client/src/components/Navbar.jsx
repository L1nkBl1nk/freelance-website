import { useContext } from "react"
import { Context } from "../main"
import {Navbar as BootstrapNavbar, Container, Nav, Button, Image} from "react-bootstrap"
import { useNavigate, NavLink } from "react-router-dom"
import { LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE } from "../utils/consts"
import {observer} from "mobx-react-lite"


const Navbar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    return(
        <>
      <BootstrapNavbar bg="dark" data-bs-theme="dark">
        <Container>
          <NavLink style={{color:'white'}} to={MAIN_ROUTE}>Freelance Web</NavLink>
          {user.isAuth ? 
          <Nav className="ms-auto">
            <Image 
              className="me-3" 
              width={35} 
              height={35} 
              roundedCircle
              style={{cursor: "pointer"}}
              onClick={() => navigate(PROFILE_ROUTE)}
            />
            <Button variant={"outline-light"} >Log out</Button>
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