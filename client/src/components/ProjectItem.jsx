import { Col, Card, Image } from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import { PROJECTPAGE_ROUTE } from "../utils/consts"

const ProjectItem = ({project, user}) => {
    const navigate = useNavigate()
    return(
        <Col
            md={3}
            className="mt-3"
            onClick={() => navigate(PROJECTPAGE_ROUTE.replace(':id', project.id))}
            
        >
            <Card style = {{width: 200, cursor: "pointer"}} border={"light"}>
                <Image width={200} height={150} src={project.img}/>
                <div>
                    {/* Добавить авартарку и рейтинг по возможности */}
                    <div>{user.username}</div>
                    <div>{project.title}</div>
                    <div>
                       <span style={{fontWeight: 'bold'}}>From:</span> {project.budget}
                    </div>

                </div>
            </Card>
        </Col>   
        
    )
}

export default ProjectItem