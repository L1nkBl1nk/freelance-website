import { Col, Card, Image } from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import { PROJECTPAGE_ROUTE } from "../utils/consts"

const ProjectItem = ({project}) => {
    const navigate = useNavigate()
    return(
        <Col
            md={3}
            className="mt-3"
            onClick={() => navigate(PROJECTPAGE_ROUTE.replace(':id', project.id))}
        >
            <Card style={{width: 200, cursor: "pointer"}} border="light">
                <Image
                    width={200}
                    height={150}
                    src={project.img ? `${import.meta.env.VITE_API_URL}${project.img}` : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150'%3E%3Crect width='200' height='150' fill='%23dee2e6'/%3E%3C/svg%3E"}
                    style={{objectFit: "cover"}}
                />
                <Card.Body className="p-2">
                    <div className="text-muted" style={{fontSize: 12}}>{project.User?.username}</div>
                    <div style={{fontWeight: 600}}>{project.title}</div>
                    <div><span style={{fontWeight: 'bold'}}>From:</span> ${project.budget}</div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProjectItem