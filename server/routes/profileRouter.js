const Router = require('express')
const router = new Router()
const profileController = require('../controllers/profileController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, profileController.create)
router.get('/', profileController.getAll)
router.get('/:userId', profileController.getByUser)
router.put('/:id', authMiddleware, profileController.update)
router.delete('/:id', authMiddleware, profileController.delete)

module.exports = router