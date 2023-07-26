const { Router } = require('express');
const router = Router();

const { getProductsHandler } = require('../Handlers/get/getProductsHandler');
const { postProductsHandler } = require('../Handlers/post/postProductsHandler')

router.get("/", getProductsHandler);

router.post('/', postProductsHandler)

module.exports = router;

