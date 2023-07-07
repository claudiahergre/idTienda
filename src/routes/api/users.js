const router = require('express').Router();
const UsersController = require('../../controllers/users.controller')

router.get('/', UsersController.getUsers)
router.post('/register', UsersController.postUser)
router.put('/:userId/buy/:productId', UsersController.buyProduct)

module.exports = router
