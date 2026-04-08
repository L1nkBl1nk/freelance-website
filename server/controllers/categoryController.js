const { Category } = require('../models/models')

class categoryController{
    async create(req,res){
        try {
            const { name } = req.body
            const category = await Category.create({ name })
            return res.json(category)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }
    async getAll(req,res){
        try {
            const category = await Category.findAll()
            return res.json(category)
        } catch (e) {
           return res.status(500).json({message: e.message})
        }
    }
    async delete(req,res){
        try {
            const { id } = req.params
            const category = await Category.findByPk(id)
            if (!category) return res.status(404).json({ message: 'Category not found' })
            await category.destroy()
            return res.json({message: 'Successfully deleted'})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

}

module.exports = new categoryController()