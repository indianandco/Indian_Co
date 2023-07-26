const { Router } = require('express');
const router = Router();

const { getCriptoInfoHandler } = require('../Handlers/get/getProductsHandler');

router.get("/", getCriptoInfoHandler);

module.exports = router;

