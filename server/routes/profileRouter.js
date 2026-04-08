const Router = require('express')
const router = new Router()
const profileController = require('../controllers/profileController')

router.post('/', profileController.create)
router.get('/', profileController.getAll)
router.get('/:userId', profileController.getByUser)
router.put('/:id', profileController.update)
router.delete('/:id', profileController.delete)

module.exports = router