import {observer} from "mobx-react-lite"
import { useContext, useEffect } from "react"
import {ListGroup} from "react-bootstrap"
import { Context } from "../main"
import { getCategories } from "../http/userApi"

const CategoryBar = observer(() =>{
    const {project} = useContext(Context)

    useEffect(() => {
        getCategories().then(data => project.setCategories(data))
    }, [])

    return (
        <div>
            <h5 className="mb-3 text-muted">Categories</h5>
            <ListGroup>
                <ListGroup.Item
                    active={!project.selectedCategory.id}
                    onClick={() => project.setSelectedCategory({})}
                    style={{cursor: "pointer", borderRadius: "8px", marginBottom: "4px"}}
                >
                    All
                </ListGroup.Item>
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