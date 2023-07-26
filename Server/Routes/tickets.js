const { Router } = require('express');
const { postTicketsHandler } = require('../Handlers/post/postTicketsHandler');
const router = Router();

router.post('/', postTicketsHandler)

module.exports = router;