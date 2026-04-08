import { Container, Form, Card, Button, Row } from "react-bootstrap"
import { NavLink, useLocation } from "react-router-dom"
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../utils/consts"
import { useState } from "react"

const Auth = () =>{
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    return(
        <Container 
            className="d-flex justify-content-center align-items-center"
            style = {{height: window.innerHeight-54}}
        >
        <Card style={{width: 600}} className="p-5">
            <h2 className="m-auto"> {isLogin ? "Log in" : "Registration"}</h2>
            <Form className="d-flex flex-column">
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

                <Button className="mt-2" variant={"outline-success"}>
                 { isLogin ? "Log in" : "Create an account!"}
                </Button>
            </Row>

            
        </Card>
        </Container>
    )
}

export default Auth