const ApiError = require("../error/ApiError")
const { Message, Order, User } = require("../models/models")

class messageController{
    async create(req,res, next){
        try {
            const { content, orderId, userId } = req.body

            const message = await Message.create({
                content,
                OrderId: orderId,
                UserId: userId
            })
            return res.json(message)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }
    async getOrderMessages(req,res,next){
        try {
            const { orderId } = req.params
            const messages = await Message.findAll({
                where: {OrderId: orderId },
                include: [
                    {model: User, attributes: ['id', 'username']}
                ],
                order: [['createdAt', 'ASC']] //sort by time
            })

            return res.json(messages)
        } catch (error) {
            return next(ApiError.internal(error.message))
        }
    }
    async delete(req,res,next){
        try {
            const { id } = req.params
            const message = await Message.findOne({
                where: {id}
            })
            if (!message) return next(ApiError.internal('Message doesnt exist!'))
            await message.destroy()
            return res.json({ message: 'Message deleted' })
        } catch (error) {
            return next(ApiError.internal(error.message))
        }
    }

}

module.exports = new messageController()