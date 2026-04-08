import {observer} from "mobx-react-lite"
import { useContext } from "react"
import {ListGroup} from "react-bootstrap"
import { Context } from "../main"

const CategoryBar = observer(() =>{
    const {project} = useContext(Context)

    return (
        <div>
            <h5 className="mb-3 text-muted">Categories</h5>
            <ListGroup>
                {project.categories.map(category =>
                    <ListGroup.Item
                        key={category.id}
                        active={category.id === project.selectedCategory.id}
                        onClick={() => project.setSelectedCategory(category)}
                        style={{cursor: "pointer", borderRadius: "8px", marginBottom: "4px"}}
                    >
                        {category.name}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    )
})

export default CategoryBar