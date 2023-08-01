const { Router } = require('express');
const router = Router();

const { postCartsHandler } = require('../Handlers/post/postCartsHandler');

const { deleteCartByIdHandler } = require ("../Handlers/delete/deleteCartByIdHandler")


router.delete('/delete/:id', deleteCartByIdHandler)
router.post('/', postCartsHandler)

module.exports = router;