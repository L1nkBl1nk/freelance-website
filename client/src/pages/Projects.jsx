import { Container, Row, Col } from "react-bootstrap"
import CategoryBar from "../components/CategoryBar"
import ProjectList from "../components/ProjectList"

const Projects = () =>{
    return(
        <Container>
            <Row>
                <Col md={3}>
                    <CategoryBar />
                </Col>
                <Col md={9}>
                    <ProjectList />
                </Col>
            </Row>
        </Container>
    )
}

export default Projects