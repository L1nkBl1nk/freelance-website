import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { PROJECTS_ROUTE, REGISTER_ROUTE } from "../utils/consts"

const features = [
    {
        icon: "💼",
        title: "Post a Project",
        description: "Describe what you need and receive bids from skilled freelancers within hours."
    },
    {
        icon: "🔍",
        title: "Find Talent",
        description: "Browse profiles, check reviews and hire the best freelancer for your task."
    },
    {
        icon: "✅",
        title: "Get it Done",
        description: "Work together, track progress and pay securely when you are satisfied."
    }
]

const MainPage = () => {
    const navigate = useNavigate()

    return (
        <>
            {/* Hero */}
            <div style={{ background: "linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)", minHeight: "520px" }}
                className="d-flex align-items-center">
                <Container>
                    <Row className="align-items-center">
                        <Col md={7} className="text-white py-5">
                            <h1 className="display-4 fw-bold mb-3">
                                Hire top freelancers <br /> for any project
                            </h1>
                            <p className="lead mb-4" style={{ opacity: 0.9 }}>
                                Connect with skilled professionals from around the world.
                                Post a project, get bids, and start working today.
                            </p>
                            <div className="d-flex gap-3">
                                <Button
                                    variant="light"
                                    size="lg"
                                    style={{ fontWeight: 600 }}
                                    onClick={() => navigate(PROJECTS_ROUTE)}
                                >
                                    Browse Projects
                                </Button>
                                <Button
                                    variant="outline-light"
                                    size="lg"
                                    onClick={() => navigate(REGISTER_ROUTE)}
                                >
                                    Get Started
                                </Button>
                            </div>
                        </Col>
                        <Col md={5} className="text-center d-none d-md-block">
                            <div style={{ fontSize: 120 }}>🚀</div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Features */}
            <Container className="py-5">
                <h2 className="text-center fw-bold mb-2">How it works</h2>
                <p className="text-center text-muted mb-5">Simple steps to get your project done</p>
                <Row className="g-4">
                    {features.map((f) => (
                        <Col md={4} key={f.title}>
                            <Card className="h-100 border-0 shadow-sm text-center p-4">
                                <div style={{ fontSize: 48 }} className="mb-3">{f.icon}</div>
                                <h5 className="fw-bold">{f.title}</h5>
                                <p className="text-muted mb-0">{f.description}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* CTA */}
            <div style={{ background: "#f8f9fa" }} className="py-5">
                <Container className="text-center">
                    <h2 className="fw-bold mb-3">Ready to start?</h2>
                    <p className="text-muted mb-4">Join thousands of clients and freelancers already using our platform.</p>
                    <Button
                        variant="primary"
                        size="lg"
                        style={{ paddingLeft: 40, paddingRight: 40 }}
                        onClick={() => navigate(REGISTER_ROUTE)}
                    >
                        Sign Up for Free
                    </Button>
                </Container>
            </div>
        </>
    )
}

export default MainPage
