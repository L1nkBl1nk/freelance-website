const ApiError = require('../error/ApiError')
const {Project, User, Category} = require('../models/models')

class projectController{
    async create(req,res,next){
        try {
            const {title, description, img, budget, status, userId, categoryId} = req.body
            const project = await Project.create({title, description, img, budget, status, UserId: userId, CategoryId: categoryId})
            return res.json(project)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }
    async getAll(req,res,next){
        try {
            const { status, categoryId } = req.query
            const where = {}
            if (status) where.status = status
            if (categoryId) where.CategoryId = categoryId
            const projects = await Project.findAll({
                where,
                include: [
                    { model: User, attributes: ['id', 'username'] },
                    { model: Category, attributes: ['id', 'name'] }
                ]
            })
            return res.json(projects)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }

    async getOne(req,res,next){
        try {
            const { id } = req.params
            const project = await Project.findOne({
                where: { id },
                include: [
                    { model: User, attributes: ['id', 'username'] },
                    { model: Category, attributes: ['id', 'name'] }
                ]
            })
            if (!project) return next(ApiError.badRequest('Project not found'))
            return res.json(project)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }

    async update(req,res,next){
        try {
            const {id} = req.params
            const {title, description, img, budget, status} = req.body
            const project = await Project.findByPk(id)
            if (!project) return res.status(404).json({message:'Project not found'})
            await project.update({title, description, img, budget, status}) 
            return res.json(project)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }

    async delete(req,res,next){
        try {
            const { id } = req.params
            const project = await Project.findByPk(id)
            if (!project) return res.status(404).json({ message: 'Project not found' })
            await project.destroy()
            return res.json({message: 'Successfully deleted'})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
    
}
module.exports = new projectController()