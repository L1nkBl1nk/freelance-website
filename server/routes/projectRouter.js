const Router = require('express')
const projectController = require('../controllers/projectController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.post('/', authMiddleware, projectController.create)
router.get('/', projectController.getAll)
router.get('/:id', projectController.getOne)
router.put('/:id', authMiddleware, projectController.update)
router.delete('/:id', authMiddleware, projectController.delete)

module.exports = router