const Router = require('express')
const projectController = require('../controllers/projectController')
const router = new Router()

router.post('/', projectController.create)
router.get('/', projectController.getAll)
router.get('/:id', projectController.getOne)
router.put('/:id', projectController.update)
router.delete('/:id', projectController.delete)

module.exports = router