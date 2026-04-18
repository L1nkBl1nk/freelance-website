import { Container, Card, Button, Badge, Spinner, Row, Col } from "react-bootstrap"
import { useEffect, useState } from "react"
import { getBid } from "../http/userApi"
import { useParams, useNavigate } from "react-router-dom"

const BidPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [bid, setBid] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        getBid(id)
            .then(data => setBid(data))
            .catch(e => setError(e.message))
    }, [id])

    if (error) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
            <p className="text-danger">Error: {error}</p>
        </div>
    )

    if (!bid) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
            <Spinner animation="border" variant="primary" />
        </div>
    )

    return (
        <Container className="py-5" style={{ maxWidth: 700 }}>
            <Button variant="outline-secondary" className="mb-4" onClick={() => navigate(-1)}>
                ← Back
            </Button>

            <Card className="shadow-sm" style={{ borderRadius: 16 }}>
                <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-4">
                        <div>
                            <h4 className="fw-bold mb-1">Bid #{bid.id}</h4>
                            <span className="text-muted" style={{ fontSize: 14 }}>
                                Project: <strong>{bid.Project?.title || '—'}</strong>
                            </span>
                        </div>
                        <Badge bg="primary" style={{ fontSize: 15, padding: '8px 14px' }}>
                            ${bid.price}
                        </Badge>
                    </div>

                    <hr />

                    <Row className="mb-3">
                        <Col>
                            <span className="text-muted" style={{ fontSize: 13 }}>YOUR MESSAGE</span>
                            <p className="mt-1" style={{ fontSize: 16 }}>{bid.message}</p>
                        </Col>
                    </Row>

                    {bid.Project?.budget && (
                        <div className="d-flex gap-4 mb-4">
                            <div>
                                <span className="text-muted" style={{ fontSize: 13 }}>PROJECT BUDGET</span>
                                <div className="fw-semibold">${bid.Project.budget}</div>
                            </div>
                            <div>
                                <span className="text-muted" style={{ fontSize: 13 }}>PROJECT STATUS</span>
                                <div>
                                    <Badge bg={bid.Project.status === 'open' ? 'success' : 'warning'}>
                                        {bid.Project.status}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    )}

                    <Button
                        variant="primary"
                        className="w-100"
                        onClick={() => navigate(`/project/${bid.ProjectId}`)}
                    >
                        Go to Project →
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default BidPage
