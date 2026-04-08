const jwt = require('jsonwebtoken')

const ApiError = require("../error/ApiError")

module.exports = function(req,res,next){
    if (req.method === 'OPTIONS'){
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] //Bearer sakasfkjsd
    
        if(!token){
            return next(ApiError.badRequest('not authorized'))
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next() // запускаем следующий middleware
    } catch (error) {
        res.status(401).json({message:'User is not authorized'})
    }
}