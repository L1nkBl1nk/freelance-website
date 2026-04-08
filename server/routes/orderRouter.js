const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')

router.post('/', orderController.create)
router.get('/user/:userId', orderController.getUserOrders)
router.get('/:id', orderController.getOne)
router.put('/:id', orderController.updateStatus)
router.delete('/:id', orderController.delete)

module.exports = router