const { Router } = require('express');
const router = Router();

const { postTicketsHandler } = require('../Handlers/post/postTicketsHandler');
const { getAllSalesHandler } = require ('../Handlers/get/getAllSalesHandler');

router.post('/', postTicketsHandler)

router.get('/', getAllSalesHandler)

module.exports = router;