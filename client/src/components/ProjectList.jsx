import { observer } from "mobx-react-lite"
import { useContext, useEffect } from "react"
import { Context } from "../main"
import {Row} from "react-bootstrap"
import ProjectItem from "./ProjectItem"

const ProjectList = observer(() =>{
    const {project} = useContext(Context)

    useEffect(() => {
        const params = {}
        if (project.selectedCategory?.id) params.categoryId = project.selectedCategory.id
        fetch(`${import.meta.env.VITE_API_URL}api/project?` + new URLSearchParams(params))
            .then(r => r.json())
            .then(data => project.setProjects(data))
    }, [project.selectedCategory])

    return(
        <Row className="d-flex">
            {project.projects.map(p =>
                <ProjectItem
                    key={p.id}
                    project={p}
                />
            )}
        </Row>
    )
})

export default ProjectList