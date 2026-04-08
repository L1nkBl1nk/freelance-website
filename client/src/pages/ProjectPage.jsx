import { useContext } from "react"
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap"
import { Context } from "../main"
import fullstackImg from "../assets/fullstackImg.png"

const ProjectPage = () =>{
    const project = {
                id:1,
                title: "Looking for Web developer",
                description: "I am looking for a web developer. Can somebody please make me a cool website about kittens?",
                img: fullstackImg,
                budget: "300$",
                status: "open"
            }
    return(
        <Container>
            <Row>
                <Col md={8} className="mt-5">
                    <div style={{fontSize: 30, fontWeight:700}}>
                        {project.title}
                    </div>
                    <div style={{fontSize: 20, width:500}} className="mt-5">
                        {project.description}
                    </div>
                    <div className="d-flex align-items-center mt-5 gap-2">
                        <Image width={30} height={30} roundedCircle/>
                        <div style={{fontSize: 20}}>testUsername</div>
                    </div>
                    <Image className="mt-4" width={700} height={400} src={project.img}/>
                    <div style={{fontSize: 30}} className="mt-2 mb-2">
                        Check what other people think about this user!
                    </div>
                </Col>
                <Col md={4} className="mt-5">
                    <Card style={{width: 300, height:400}} className="d-flex align-items-center justify-content-center">
                        <Button className="w-100" variant="dark">Make a Bid!</Button>
                        <Button className="w-100 mt-3" variant="light">Contact Client</Button>
                    </Card>
                </Col>
            </Row>
            {/* Добавить с Profile все атрибуты к заказу! */}
        </Container>
    )
}

export default ProjectPage