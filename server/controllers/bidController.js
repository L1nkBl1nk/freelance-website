const ApiError = require("../error/ApiError")
const { Bid, User, Project } = require("../models/models")

class bidController{
    async create(req,res, next){
        try {
            const {price, message, userId, projectId} = req.body
            const bid = await Bid.create({price, message, UserId: userId, ProjectId: projectId})
            return res.json(bid)    
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }
    async getProjectBids(req,res,next){
        try {
            const { projectId } = req.params
            const bids = await Bid.findAll({
                where: { ProjectId: projectId },
                include: [
                    { model: User, attributes: ['id', 'username'] }
                ]
            })
            return res.json(bids)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }
    async getUserBids(req,res, next){
        try {
            const {userId} = req.params
            const bids = await Bid.findAll({ where: {UserId: userId},
                include: [
                    {model: Project}
                ]
            })
            return res.json(bids)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }
    async getOneBid(req,res, next){
        try {
            const {bidId} = req.params
            const bid = await Bid.findByPk(bidId)
            if (!bid) return next(ApiError.badRequest('Bid not found'))
            return res.json(bid)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }

    async delete(req,res, next){
        try {
            const { id } = req.params
            const bid = await Bid.findByPk(id)
            if (!bid) return next(ApiError.badRequest('Bid not found'))
            await bid.destroy()
            return res.json({message: 'Successfully deleted'})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new bidController()