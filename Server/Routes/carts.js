const { Router } = require('express');
const router = Router();

const { emptyCartHandler } = require('../Handlers/put/emptyCartHandler');
const { getCartByIdHandler } = require('../Handlers/get/getCartById');

router.put('/:cid', emptyCartHandler);
router.get('/:cid', getCartByIdHandler);

//Agregar o quitar un producto del carrito, tambien gestionaria la propiedad Quantity
router.put('/:cid/products/:pid', putAddOrRemoveProductOfCart); //Ponernos de acuerdo.

module.exports = router;