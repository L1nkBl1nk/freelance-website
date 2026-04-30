const { Review, Order, User, Bid, Project } = require("../models/models");
const ApiError = require("../error/ApiError");

class reviewController{
    async create(req,res, next){
        try {
            const { rating, comment, orderId, reviewerId, targetUserId} = req.body;

            const existing = await Review.findOne({
                where: {OrderId: orderId, reviewerId}
            })

            if (existing)
                return next(ApiError.badRequest('You have already post a review'))

            const review = await Review.create({
                rating,
                comment,
                OrderId: orderId,
                reviewerId,
                targetUserId,
            })

            return res.json(review)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }
    async getUserReview(req,res,next){
        try {
            const {userId} = req.params;

            const review = await Review.findAll({
                where: {targetUserId: userId},
                include: [
                    {model: User, as:'reviewer', attributes:['id', 'username']},
                    {model: Order, attributes:['id', 'status']}
                ]
            })

            return res.json(review)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }
    async getOrderReview(req,res,next){
        try {
            const { orderId } = req.params

            const reviews = await Review.findAll({
                where: {OrderId: orderId},
                include:[
                    {model: User, as: 'reviewer', attributes: ['id', 'username']},
                    {model: User, as: 'targetUser', attributes: ['id','username']}
                ]
            })

            return res.json(reviews)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }
    
    async delete(req,res,next){
        try {
            const { id } = req.params

            const review = await Review.findOne({ where: {id}})
            if(!review) return next(ApiError.badRequest('Review doesnt exist'))

            await review.destroy()
            return res.json({ message: 'Review deleted' })
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }

}

module.exports = new reviewController()