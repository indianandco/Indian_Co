const { Router } = require('express');
const router = Router();

const { emptyCartHandler } = require('../Handlers/put/emptyCartHandler');
const { getCartByIdHandler } = require('../Handlers/get/getCartById');
const { postTicketsHandler } = require('../Handlers/post/postTicketsHandler');
const { pagarConMercadoPago } = require('../Handlers/get/pagarConMercadoPago');

router.put('/:cid', emptyCartHandler);
router.get('/:cid', getCartByIdHandler);

//Agregar o quitar un producto del carrito, tambien gestionaria la propiedad Quantity
// router.put('/:cid/products/:pid', putAddOrRemoveProductOfCart); //Ponernos de acuerdo.

//Finalizar venta + redireccion/cobro con mercadopago
router.post('/:cid/purchase', postTicketsHandler);
router.get('/:cid/purchase/mercadopago', pagarConMercadoPago);

module.exports = router;