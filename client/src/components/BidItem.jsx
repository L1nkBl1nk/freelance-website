import { Col, Card, Badge } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { BIDPAGE_ROUTE } from "../utils/consts"

const BidItem = ({ bid }) => {
    const navigate = useNavigate()
    return (
        <Col md={4} className="mt-3">
            <Card
                style={{ cursor: "pointer", borderRadius: 12 }}
                className="shadow-sm h-100"
                onClick={() => navigate(BIDPAGE_ROUTE.replace(':id', bid.id))}
            >
                <Card.Body className="p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="fw-semibold" style={{ fontSize: 15 }}>
                            {bid.Project?.title || 'Project #' + bid.ProjectId}
                        </div>
                        <Badge bg="primary">${bid.price}</Badge>
                    </div>
                    <p className="text-muted mb-2" style={{ fontSize: 13, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {bid.message}
                    </p>
                    <div className="d-flex gap-2 mt-auto">
                        <Badge bg={bid.Project?.status === 'open' ? 'success' : 'warning'} style={{ fontSize: 11 }}>
                            {bid.Project?.status || 'open'}
                        </Badge>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default BidItem
