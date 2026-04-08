import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { Context } from "../main"
import {Row} from "react-bootstrap"
import ProjectItem from "./ProjectItem"

const ProjectList = observer(() =>{
    const {project} = useContext(Context)    
    const {user} = useContext(Context)
    return(
        <Row className="d-flex">
            {project.projects.map(project => 
                <ProjectItem 
                    key={project.id} 
                    project = {project}
                    user = {user}
                />
            )}
        </Row>
    )
})

export default ProjectList