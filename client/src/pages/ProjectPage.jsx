import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Row, Col, Card, Button, Image, Badge, Spinner, Form } from "react-bootstrap"
import { createBid, getProject } from "../http/userApi"
import { Context } from "../main"
import { APPLICATIONS_ROUTE } from "../utils/consts"

const ProjectPage = () => {
    const { user } = useContext(Context)
    const { id } = useParams()
    const navigate = useNavigate()
    const [project, setProject] = useState(null)
    const [error, setError] = useState(null)
    const [showBidForm, setShowBidForm] = useState(false)
    const [bidPrice, setBidPrice] = useState("")
    const [bidMessage, setBidMessage] = useState("")
    const [bidSubmitted, setBidSubmitted] = useState(false)

    const handleCreateBid = async () => {
        try {
            await createBid(Number(bidPrice), bidMessage, user.user.id, Number(id))
            setBidSubmitted(true)
            setShowBidForm(false)
        } catch (e) {
            alert(e.response?.data?.message || 'Failed to submit bid')
        }
    }

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
                            {user.user?.role === "freelancer"
                                ? <>
                                    {project.status !== 'open'
                                        ? <Button className="w-100 mb-2" variant="secondary" disabled>
                                            Project is {project.status.replace('_', ' ')}
                                          </Button>
                                        : bidSubmitted
                                        ? <Button className="w-100 mb-2" variant="success" disabled>Bid Submitted ✓</Button>
                                        : <Button
                                            className="w-100 mb-2"
                                            variant="primary"
                                            onClick={() => setShowBidForm(v => !v)}
                                          >
                                            Make a Bid
                                          </Button>
                                    }
                                    {showBidForm && !bidSubmitted && project.status === 'open' && (
                                        <Form className="mt-2">
                                            <Form.Control
                                                className="mb-2"
                                                type="number"
                                                placeholder="Your price ($)"
                                                value={bidPrice}
                                                onChange={e => setBidPrice(e.target.value)}
                                            />
                                            <Form.Control
                                                className="mb-2"
                                                as="textarea"
                                                rows={3}
                                                placeholder="Your message..."
                                                value={bidMessage}
                                                onChange={e => setBidMessage(e.target.value)}
                                            />
                                            <Button
                                                className="w-100"
                                                variant="success"
                                                onClick={handleCreateBid}
                                                disabled={!bidPrice || !bidMessage}
                                            >
                                                Submit Bid
                                            </Button>
                                        </Form>
                                    )}
                                  </>
                                : <Button className="w-100 mb-2" variant="primary" onClick={() => navigate(APPLICATIONS_ROUTE)}>Watch bids for your project</Button>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ProjectPage
