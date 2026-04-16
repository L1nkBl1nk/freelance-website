import { Container, Form, Card, Button, Row } from "react-bootstrap"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTER_ROUTE } from "../utils/consts"
import { useState, useContext } from "react"
import { Context } from "../main"
import { login, registration } from "../http/userApi"

const Auth = () =>{
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("client")

    const handleAuth = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(username, email, password, role)
            }
            localStorage.setItem('token', data.token)
            const payload = JSON.parse(atob(data.token.split('.')[1]))
            user.setUser(payload)
            user.setIsAuth(true)
            navigate(MAIN_ROUTE)
        } catch (e) {
            alert(e.response?.data?.message || 'Something went wrong')
        }
    }

    return(
        <Container
            className="d-flex justify-content-center align-items-center"
            style = {{height: window.innerHeight-54}}
        >
        <Card style={{width: 600}} className="p-5">
            <h2 className="m-auto"> {isLogin ? "Log in" : "Registration"}</h2>
            <Form className="d-flex flex-column">
                {!isLogin && (
                    <>
                    <Form.Control
                        className="mt-2"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Form.Select
                        className="mt-2"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                    >
                        <option value="client">Client</option>
                        <option value="freelancer">Freelancer</option>
                    </Form.Select>
                    </>
                )}
                <Form.Control
                    className="mt-2"
                    placeholder="example@gmail.com"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Form.Control
                    className="mt-2"
                    placeholder="Write password..."
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </Form>
            <Row className="d-flex justify-content-between mt-3 px-3">
                {isLogin ? <div>
                    Don't have an account? <NavLink to={REGISTER_ROUTE}>Create account</NavLink>
                </div> :
                <div>
                    Already have an account? <NavLink to={LOGIN_ROUTE}>Sign in!</NavLink>
                </div>
                }
                <Button className="mt-2" variant={"outline-success"} onClick={handleAuth}>
                 { isLogin ? "Log in" : "Create an account!"}
                </Button>
            </Row>
        </Card>
        </Container>
    )
}

export default Auth
