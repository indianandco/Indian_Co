const { Router } = require('express');
const router = Router();

const { postTicketsHandler } = require('../Handlers/post/postTicketsHandler');

router.post('/', postTicketsHandler);

module.exports = router;