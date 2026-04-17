import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Card, Button, Image, Badge, Spinner } from "react-bootstrap"
import { getProject } from "../http/userApi"

const ProjectPage = () => {
    const { id } = useParams()
    const [project, setProject] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        getProject(id)
            .then(data => setProject(data))
            .catch(e => setError(e.message))
    }, [id])

    if (error) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
            <p className="text-danger">Error: {error}</p>
        </div>
    )

    if (!project) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
            <Spinner animation="border" variant="primary" />
        </div>
    )

    return (
        <Container className="py-5">
            <Row>
                <Col md={8}>
                    <h2 className="fw-bold mb-2">{project.title}</h2>

                    <div className="d-flex align-items-center gap-2 mb-4">
                        <Badge bg="secondary">{project.Category?.name}</Badge>
                        <Badge bg={project.status === 'open' ? 'success' : 'warning'}>
                            {project.status}
                        </Badge>
                    </div>

                    {project.img && (
                        <Image
                            src={`${import.meta.env.VITE_API_URL}${project.img}`}
                            width="100%"
                            style={{ maxHeight: 400, objectFit: "cover", borderRadius: 12 }}
                            className="mb-4"
                        />
                    )}

                    <h5 className="fw-semibold">Description</h5>
                    <p className="text-secondary" style={{ fontSize: 16 }}>{project.description}</p>

                    <hr className="my-4" />

                    <h6 className="text-muted mb-2">Posted by</h6>
                    <div className="d-flex align-items-center gap-2">
                        <Image
                            width={36}
                            height={36}
                            roundedCircle
                            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36'%3E%3Crect width='36' height='36' fill='%23dee2e6' rx='50'/%3E%3C/svg%3E"
                            style={{ objectFit: "cover" }}
                        />
                        <span style={{ fontSize: 16, fontWeight: 500 }}>{project.User?.username}</span>
                    </div>
                </Col>

                <Col md={4}>
                    <Card className="shadow-sm" style={{ borderRadius: 12 }}>
                        <Card.Body className="p-4">
                            <div className="mb-3">
                                <span className="text-muted">Budget</span>
                                <div style={{ fontSize: 28, fontWeight: 700 }}>${project.budget}</div>
                            </div>
                            <Button className="w-100 mb-2" variant="primary">Make a Bid</Button>
                            <Button className="w-100" variant="outline-secondary">Contact Client</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ProjectPage
