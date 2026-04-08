const Router = require('express')
const router = new Router()
const reviewController = require('../controllers/reviewController')


router.post('/', reviewController.create)
router.get('/user/:userId', reviewController.getUserReview)
router.get('/order/:orderId', reviewController.getOrderReview)
router.delete('/:id', reviewController.delete)

module.exports = router