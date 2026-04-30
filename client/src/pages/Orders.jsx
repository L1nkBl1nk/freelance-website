import { Container, Row, Col, Card, Button, Badge, Spinner } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { getUserOrders } from "../http/userApi"
import { Context } from "../main"
import { ORDERPAGE_ROUTE } from "../utils/consts"
import { useNavigate } from "react-router-dom"

const statusVariant = { pending: 'secondary', in_progress: 'primary', completed: 'success', cancelled: 'danger' }
const ALL_STATUSES = ['all', 'pending', 'in_progress', 'completed', 'cancelled']

const Orders = () => {
    const { user } = useContext(Context)
    const navigate = useNavigate()
    const [orders, setOrders] = useState(null)
    const [err, setErr] = useState(null)
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        getUserOrders(user.user.id)
            .then(data => setOrders(data))
            .catch(e => setErr(e.message))
    }, [user.user.id])

    if (err) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
            <p className="text-danger">Error: {err}</p>
        </div>
    )

    if (!orders) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
            <Spinner animation="border" variant="primary" />
        </div>
    )

    const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

    return (
        <Container className="py-4">
            <h2 className="fw-bold mb-3">My Orders</h2>

            <div className="d-flex gap-2 mb-4 flex-wrap">
                {ALL_STATUSES.map(s => (
                    <Button
                        key={s}
                        size="sm"
                        variant={filter === s ? (s === 'all' ? 'dark' : statusVariant[s] || 'secondary') : 'outline-secondary'}
                        onClick={() => setFilter(s)}
                        style={{ textTransform: 'capitalize' }}
                    >
                        {s.replace('_', ' ')}
                    </Button>
                ))}
            </div>

            {!filtered.length
                ? <p className="text-muted">No orders for this filter.</p>
                : <Row>
                    {filtered.map(o => (
                        <Col md={4} className="mb-4" key={o.id}>
                            <Card className="shadow-sm h-100" style={{ borderRadius: 12 }}>
                                <Card.Img
                                    variant="top"
                                    src={o.Bid?.Project?.img
                                        ? `${import.meta.env.VITE_API_URL}${o.Bid.Project.img}`
                                        : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%23dee2e6'/%3E%3C/svg%3E"
                                    }
                                    style={{ height: 180, objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
                                />
                                <Card.Body className="d-flex flex-column p-3">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <Card.Title className="mb-0" style={{ fontSize: 16 }}>
                                            {o.Bid?.Project?.title || 'Project'}
                                        </Card.Title>
                                        <Badge bg={statusVariant[o.status] || 'secondary'}>
                                            {o.status?.replace('_', ' ')}
                                        </Badge>
                                    </div>
                                    <div className="text-muted mb-1" style={{ fontSize: 13 }}>
                                        Client: <strong>{o.client?.username}</strong>
                                    </div>
                                    <div className="text-muted mb-2" style={{ fontSize: 13 }}>
                                        Freelancer: <strong>{o.freelancer?.username}</strong>
                                    </div>
                                    <div className="fw-bold mb-3">${o.Bid?.price}</div>
                                    <Button
                                        variant="primary"
                                        className="mt-auto"
                                        onClick={() => navigate(ORDERPAGE_ROUTE.replace(':id', o.id))}
                                    >
                                        Go to Order
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            }
        </Container>
    )
}

export default Orders
