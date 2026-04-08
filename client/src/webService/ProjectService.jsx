import {makeAutoObservable} from 'mobx'

export default class ProjectService{
    constructor(){
        this._categories = [
            {id:1, name:"Python"},
            {id:2, name:"Web applications"},
            {id:3, name:"Mobile Development"},
            {id:4, name:"UI/UX Design"},

        ]

        this._projects = [
            {
                id:1,
                title: "Looking for Web developer",
                description: "I am looking for a web developer. Can somebody please make me a cool website about kittens?",
                img: "",
                budget: "300$",
                status: "open"
            },
            {
                id:2,
                title: "Looking for Python",
                description: "I am looking for a python. Can somebody make me a Claude Code 28.0?",
                img: "",
                budget: "11.5$",
                status: "open"
            },
        ]

        this._selectedCategory = {}

        makeAutoObservable(this)
    }

    setCategories(categories) {
        this._categories = categories
    }

    setProjects(projects) {
        this._projects = projects
    }
    setSelectedCategory(category){
        this._selectedCategory = category
    }

    get categories() {
        return this._categories
    }

    get projects() {
        return this._projects
    }

    get selectedCategory(){
        return this._selectedCategory
    }
}