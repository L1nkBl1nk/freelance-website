const ApiError = require("../error/ApiError");
const { Op } = require("sequelize")
const { Bid, Project, Order, User, Message, Review } = require("../models/models")

class orderController{
    async create(req,res, next){
        try {
            const { bidId } = req.body

            const bid = await Bid.findOne({where: {id: bidId},
            include: [{model: Project}]
            });

            if (!bid){
                return next(ApiError.internal('Bid not found'))
            }

            const order = await Order.create({
                BidId: bid.id,
                clientId: bid.Project.UserId,
                freelancerId: bid.UserId,
                status: 'in_progress'
            })

            await bid.Project.update({ status: 'in_progress' })
            return res.json(order)
        } catch (error) {
            return next(ApiError.internal(error.message))
        }
    }
    async getUserOrders(req,res, next){
        try {
            
        
        const {userId} = req.params

        const orders = await Order.findAll({
            where: {
                [Op.or]: [
                    { clientId: userId },
                    { freelancerId: userId }
                ]
            },
            include: [
                { model: User, as: "client", attributes: ["id", "username"] },
                { model: User, as: "freelancer", attributes: ["id", "username"] },
                { model: Bid, include: [{ model: Project }] }
            ]
        })
        return res.json(orders)

        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }
    async getOne(req,res,next){
        try {
            const { id } = req.params

            const order = await Order.findOne({
                where: {id},
                include:[
                    {model: User, as: 'client', attributes:['id', 'username'] },
                    {model: User, as: 'freelancer', attributes:['id', 'username'] },
                    {model: Bid, include:[{model: Project}] },
                    {model: Message, include:[{model: User, attributes:['id', 'username']}] },
                    {model: Review},
                ]
            })
            if (!order) return next(ApiError.badRequest('Order not found'))
            return res.json(order)
        } catch (error) {
         return next(ApiError.badRequest(error.message))  
        }
    }

    async updateStatus(req, res, next){
        try {
            const {id} = req.params
            const {status} = req.body
            const allowed = ['pending', 'in_progress', 'completed', 'cancelled']
            if (!allowed.includes(status)) return next(ApiError.badRequest('Invalid status'))

            const order = await Order.findOne({ where: {id}});
            if (!order) return next(ApiError.badRequest('Order not found'))
            await order.update({status})
        
            return res.json(order)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }

    async delete(req,res,next){
        try {
          const {id} = req.params

          const order = await Order.findOne({where:{id}})
          if (!order) return next(ApiError.badRequest('Order not found'))

          await order.destroy()
          return res.json(order)   
        } catch (error) {
          return next(ApiError.badRequest(error.message))  
        }
       

    }
}

module.exports = new orderController()