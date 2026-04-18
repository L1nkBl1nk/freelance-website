import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { Context } from "../main"
import { Container, Row, Col, Card, Badge, Spinner, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { getClientBids, createOrder } from "../http/userApi"
import { PROJECTPAGE_ROUTE } from "../utils/consts"

const Applications = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()
    const [bids, setBids] = useState(null)
    const [error, setError] = useState(null)
    const [accepted, setAccepted] = useState({})

    const handleAccept = async (e, bidId) => {
        e.stopPropagation()
        try {
            await createOrder(bidId)
            setAccepted(prev => ({ ...prev, [bidId]: true }))
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to create order')
        }
    }

    useEffect(() => {
        getClientBids(user.user.id)
            .then(data => setBids(data))
            .catch(e => setError(e.message))
    }, [user.user.id])

    if (error) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
            <p className="text-danger">Error: {error}</p>
        </div>
    )

    if (!bids) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
            <Spinner animation="border" variant="primary" />
        </div>
    )

    return (
        <Container className="py-4">
            <h2 className="fw-bold mb-4">Applications</h2>
            {!bids.length
                ? <p className="text-muted">No applications yet.</p>
                : <Row>
                    {bids.map(bid => (
                        <Col md={6} className="mb-3" key={bid.id}>
                            <Card
                                className="shadow-sm h-100"
                                style={{ borderRadius: 12, cursor: 'pointer' }}
                                onClick={() => navigate(PROJECTPAGE_ROUTE.replace(':id', bid.ProjectId))}
                            >
                                <Card.Body className="p-4">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <div>
                                            <div className="fw-semibold" style={{ fontSize: 16 }}>
                                                {bid.Project?.title || 'Project #' + bid.ProjectId}
                                            </div>
                                            <div className="text-muted" style={{ fontSize: 13 }}>
                                                by {bid.User?.username}
                                            </div>
                                        </div>
                                        <Badge bg="primary" style={{ fontSize: 14, padding: '6px 12px' }}>
                                            ${bid.price}
                                        </Badge>
                                    </div>
                                    <p className="text-secondary mb-2" style={{
                                        fontSize: 14,
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical'
                                    }}>
                                        {bid.message}
                                    </p>
                                    <Button
                                        variant={accepted[bid.id] ? 'success' : 'outline-success'}
                                        size="sm"
                                        className="w-100 mt-1"
                                        disabled={accepted[bid.id]}
                                        onClick={(e) => handleAccept(e, bid.id)}
                                    >
                                        {accepted[bid.id] ? 'Accepted ✓' : 'Accept'}
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            }
        </Container>
    )
})

export default Applications
