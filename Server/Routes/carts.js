const { Router } = require('express');
const router = Router();

const { postCartsHandler } = require('../Handlers/post/postCartsHandler');
const { deleteCartByIdHandler } = require ("../Handlers/delete/deleteCartByIdHandler");
const { emptyCartHandler } = require('../Handlers/put/emptyCartHandler');

router.delete('/delete/:id', deleteCartByIdHandler);
router.post('/', postCartsHandler);
router.put('/:cid', emptyCartHandler);

module.exports = router;