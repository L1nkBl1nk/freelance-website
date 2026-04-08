const Router = require('express')
const router = new Router()
const messageController = require('../controllers/messageController')

router.post('/', messageController.create)
router.get('/:orderId', messageController.getOrderMessages)
router.delete('/:id', messageController.delete)

module.exports = router