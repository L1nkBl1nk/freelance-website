const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')
const {Project, User, Category} = require('../models/models')

class projectController{
    async create(req,res,next){
        try {
            const {title, description, budget, categoryId} = req.body || {}
            const userId = req.user.id
            let fileName = null
            if (req.files && req.files.img) {
                fileName = uuid.v4() + '.jpg'
                await req.files.img.mv(path.resolve(__dirname, '..', 'static', fileName))
            }
            const project = await Project.create({title, description, img: fileName, budget, UserId: userId, CategoryId: categoryId})
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
            const {title, description, budget, status} = req.body
            const project = await Project.findByPk(id)
            if (!project) return next(ApiError.badRequest('Project not found'))
            if (project.UserId !== req.user.id) return next(ApiError.forbidden('Access denied'))
            await project.update({title, description, budget, status})
            return res.json(project)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }

    async delete(req,res,next){
        try {
            const { id } = req.params
            const project = await Project.findByPk(id)
            if (!project) return next(ApiError.badRequest('Project not found'))
            if (project.UserId !== req.user.id) return next(ApiError.forbidden('Access denied'))
            await project.destroy()
            return res.json({message: 'Successfully deleted'})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
    
}
module.exports = new projectController()