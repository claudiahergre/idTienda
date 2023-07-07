const router = require('express').Router();
const ProductosController = require('../../controllers/products.controller')

router.get('/', ProductosController.getProductos)
router.get('/:productId', ProductosController.getById)

router.post('/', ProductosController.postProducto)
router.put('/:productId', ProductosController.putProducto)
router.delete('/:productId', ProductosController.deleteProducto)

module.exports = router
