require('dotenv').config()
const express = require('express')
const sequelize = require('./db.js')
const models = require('./models/models.js')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index.js')
const errorHandler = require('./middleware/ErrorHandlingMiddleware.js')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors()) // если у фронта с бэком разные локалхосты то они не смогут общаться между собой
app.use(express.json())
app.use(fileUpload())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)

//Обраюотка ошибок в конце!!
app.use(errorHandler)

const start = async () =>{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,() =>{
            console.log(`Server is started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()

