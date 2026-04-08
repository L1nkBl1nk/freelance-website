const bcrypt = require('bcrypt')
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const { User } = require('../models/models')

const generateJwt = (username,id,email, role) =>{
    return (jwt.sign(
        {username, id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
        )
    )    
}


class userController{
    async registration(req,res,next){
        try {
            const {username, email, password, role } = req.body
       if(!email || !password){
            return next(ApiError.badRequest('Invalid data'))
       }

       const candidate = await User.findOne({ where: {email}})
       if(candidate){
        return next(ApiError.badRequest('User with this email already exist!'))
       }

       const hashPassword = await bcrypt.hash(password, 5)
       const user = await User.create({username, email, role, password: hashPassword})
       const token = generateJwt(user.username, user.id, user.email, user.role)
        return res.json({token})
        } catch (error) {
           return next(ApiError.badRequest(error.message))
        }
       
    
    }
    async login(req,res,next){
        try {
            const {email, password} = req.body
        const user = await User.findOne({where: {email}})

        if(!user){
            return next(ApiError.badRequest('User does not exist!'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.badRequest('Incorrect Password!'))
        }
        const token = generateJwt(user.username, user.id, user.email, user.role)
        return res.json({token})
        } catch (error) {
            next(ApiError.internal(error.message))
        }
        
    }
    async check(req,res, next){
        try {
            const token = generateJwt(req.user.username, req.user.id, req.user.email, req.user.role)
            return res.json(token)
        } catch (error) {
            return next(ApiError.internal(error.message))
        }
    }

}

module.exports = new userController()