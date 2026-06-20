const Router = require('express')
const router = new Router()
const bidController = require('../controllers/bidController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, bidController.create)
router.get('/project/:projectId', bidController.getProjectBids)
router.get('/user/:userId', bidController.getUserBids)
router.get('/client/:userId', bidController.getClientBids)
router.get('/:bidId', bidController.getOneBid)
router.delete('/:id', authMiddleware, bidController.delete)

module.exports = router