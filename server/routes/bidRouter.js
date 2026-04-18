const Router = require('express')
const router = new Router()
const bidController = require('../controllers/bidController')

router.post('/', bidController.create)
router.get('/project/:projectId', bidController.getProjectBids)
router.get('/user/:userId', bidController.getUserBids)
router.get('/client/:userId', bidController.getClientBids)
router.get('/:bidId', bidController.getOneBid)
router.delete('/:id', bidController.delete)

module.exports = router