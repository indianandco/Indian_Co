const { Router } = require('express');
const router = Router();

const { getProductsHandler } = require('../Handlers/get/getProductsHandler');
const { postProductsHandler } = require('../Handlers/post/postProductsHandler')
const { getProductByIdHandler } = require('../Handlers/get/getProductByIdHandler')
const { getProductByCategoryHandler } = require ('../Handlers/get/getProductByCategoryHandler')
const { getProductByTitleHandler } = require ('../Handlers/get/getProductByTitleHandler')

router.get("/", getProductsHandler);
router.get('/search', getProductByTitleHandler)
router.get("/:category/:id", getProductByIdHandler)
router.get("/:category",getProductByCategoryHandler)


router.post('/', postProductsHandler)

module.exports = router;

