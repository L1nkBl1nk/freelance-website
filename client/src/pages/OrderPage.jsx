import { useEffect, useState, useContext, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Row, Col, Card, Badge, Spinner, Form, Button, Modal } from "react-bootstrap"
import { getOrder, getOrderMessage, postMessage, updateOrderStatus, createReview } from "../http/userApi"
import { Context } from "../main"

const statusVariant = { pending: 'secondary', in_progress: 'primary', completed: 'success', cancelled: 'danger' }

const StarRating = ({ value, onChange }) => (
    <div className="d-flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map(n => (
            <span
                key={n}
                onClick={() => onChange(n)}
                style={{ fontSize: 28, cursor: 'pointer', color: n <= value ? '#ffc107' : '#dee2e6' }}
            >
                ★
            </span>
        ))}
    </div>
)

const OrderPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useContext(Context)
    const bottomRef = useRef(null)

    const [order, setOrder] = useState(null)
    const [messages, setMessages] = useState([])
    const [text, setText] = useState("")
    const [error, setError] = useState(null)

    const [showReviewModal, setShowReviewModal] = useState(false)
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState("")
    const [reviewSent, setReviewSent] = useState(false)
    const [completing, setCompleting] = useState(false)

    useEffect(() => {
        getOrder(id)
            .then(data => setOrder(data))
            .catch(e => setError(e.message))
        getOrderMessage(id)
            .then(data => setMessages(data))
            .catch(e => setError(e.message))
    }, [id])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = async () => {
        if (!text.trim()) return
        try {
            const msg = await postMessage(text.trim(), Number(id), user.user.id)
            setMessages(prev => [...prev, { ...msg, User: { username: user.user.username } }])
            setText("")
        } catch (e) {
            alert(e.response?.data?.message || 'Failed to send message')
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleChangeStatus = async (status) => {
        setCompleting(true)
        try {
            const updated = await updateOrderStatus(id, status)
            setOrder(prev => ({ ...prev, status: updated.status }))
            if (status === 'completed') setShowReviewModal(true)
        } catch (e) {
            alert(e.response?.data?.message || 'Failed to update order')
        } finally {
            setCompleting(false)
        }
    }

    const handleSubmitReview = async () => {
        try {
            await createReview(rating, comment, Number(id), user.user.id, order.freelancerId)
            setReviewSent(true)
            setShowReviewModal(false)
        } catch (e) {
            alert(e.response?.data?.message || 'Failed to submit review')
        }
    }

    if (error) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
            <p className="text-danger">Error: {error}</p>
        </div>
    )

    if (!order) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
            <Spinner animation="border" variant="primary" />
        </div>
    )

    const isClient = user.user.id === order.clientId

    return (
        <Container className="py-4">
            <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>
                ← Back
            </Button>

            <Row>
                <Col md={4} className="mb-4">
                    <Card className="shadow-sm" style={{ borderRadius: 12 }}>
                        <Card.Body className="p-4">
                            <h5 className="fw-bold mb-3">{order.Bid?.Project?.title || 'Order #' + order.id}</h5>

                            <div className="mb-3">
                                <Badge bg={statusVariant[order.status] || 'secondary'} style={{ fontSize: 13 }}>
                                    {order.status?.replace('_', ' ')}
                                </Badge>
                            </div>

                            <div className="mb-2" style={{ fontSize: 14 }}>
                                <span className="text-muted">Client: </span>
                                <strong>{order.client?.username}</strong>
                            </div>
                            <div className="mb-2" style={{ fontSize: 14 }}>
                                <span className="text-muted">Freelancer: </span>
                                <strong>{order.freelancer?.username}</strong>
                            </div>
                            <div className="mb-3" style={{ fontSize: 14 }}>
                                <span className="text-muted">Bid price: </span>
                                <strong>${order.Bid?.price}</strong>
                            </div>

                            {isClient && order.status === 'in_progress' && (
                                <div className="d-flex flex-column gap-2">
                                    <Button
                                        variant="success"
                                        className="w-100"
                                        disabled={completing}
                                        onClick={() => handleChangeStatus('completed')}
                                    >
                                        {completing ? 'Saving…' : 'Complete Order'}
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        className="w-100"
                                        disabled={completing}
                                        onClick={() => handleChangeStatus('cancelled')}
                                    >
                                        Cancel Order
                                    </Button>
                                </div>
                            )}

                            {reviewSent && (
                                <div className="text-success mt-2" style={{ fontSize: 13 }}>
                                    Отзыв отправлен!
                                </div>
                            )}

                            {['completed', 'cancelled'].includes(order.status) && isClient && !reviewSent && (
                                <Button
                                    variant="outline-warning"
                                    size="sm"
                                    className="w-100 mt-2"
                                    onClick={() => setShowReviewModal(true)}
                                >
                                    Leave a Review
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={8}>
                    <Card className="shadow-sm" style={{ borderRadius: 12 }}>
                        <Card.Header className="fw-semibold bg-white" style={{ borderRadius: '12px 12px 0 0' }}>
                            Chat
                        </Card.Header>
                        <Card.Body
                            style={{ height: 420, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, padding: 16 }}
                        >
                            {!messages.length
                                ? <p className="text-muted m-auto">No messages yet. Say hi!</p>
                                : messages.map(msg => {
                                    const isMe = msg.UserId === user.user.id
                                    return (
                                        <div
                                            key={msg.id}
                                            className={`d-flex flex-column ${isMe ? 'align-items-end' : 'align-items-start'}`}
                                        >
                                            <div style={{ fontSize: 11, color: '#888', marginBottom: 2 }}>
                                                {msg.User?.username}
                                            </div>
                                            <div style={{
                                                background: isMe ? '#0d6efd' : '#f1f3f5',
                                                color: isMe ? '#fff' : '#212529',
                                                borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                                padding: '8px 14px',
                                                maxWidth: '70%',
                                                fontSize: 14
                                            }}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div ref={bottomRef} />
                        </Card.Body>
                        <Card.Footer className="bg-white" style={{ borderRadius: '0 0 12px 12px' }}>
                            <div className="d-flex gap-2">
                                <Form.Control
                                    placeholder="Type a message..."
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <Button variant="primary" onClick={handleSend} disabled={!text.trim()}>
                                    Send
                                </Button>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>

            <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Leave a Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-muted mb-2">Rate your experience with <strong>{order.freelancer?.username}</strong></p>
                    <StarRating value={rating} onChange={setRating} />
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Write a comment (optional)..."
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => setShowReviewModal(false)}>Skip</Button>
                    <Button variant="primary" onClick={handleSubmitReview}>Submit Review</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default OrderPage
