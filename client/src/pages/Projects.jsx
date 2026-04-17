import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap"
import CategoryBar from "../components/CategoryBar"
import ProjectList from "../components/ProjectList"
import { observer } from "mobx-react-lite"
import { useContext, useState, useEffect } from "react"
import { Context } from "../main"
import { getCategories, createProject } from "../http/userApi"



const Projects = observer(() =>{

    const [show, setShow] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [budget, setBudget] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [categories, setCategories] = useState([])
    const [imgFile, setImgFile] = useState(null)

    const { user } = useContext(Context)

    useEffect(() => {
        getCategories().then(data => {
            setCategories(data)
            if (data.length > 0) setCategoryId(data[0].id)
        })
    }, [])

    const handleCreate = async () => {
        await createProject(title, description, budget, categoryId, imgFile)
        setShow(false)
        setTitle("")
        setDescription("")
        setBudget("")
        setImgFile(null)
    }

    return(
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Projects</h2>
                {user.user?.role === "client" && (
                    <Button
                        variant="primary"
                        onClick={() => setShow(true)}
                        style={{ borderRadius: 8, paddingLeft: 20, paddingRight: 20 }}
                    >
                        + Create Project
                    </Button>
                )}
            </div>

            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>New Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="Title" className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                placeholder="Project title..."
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="Description" className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Describe your project..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="Budget" className="mb-3">
                                    <Form.Label>Budget ($)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="0"
                                        value={budget}
                                        onChange={(e) => setBudget(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="Category" className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="ProjectImg" className="mb-3">
                            <Form.Label>Project Image (optional)</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImgFile(e.target.files[0])}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => setShow(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleCreate}>
                        Create Project
                    </Button>
                </Modal.Footer>
            </Modal>

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
})

export default Projects