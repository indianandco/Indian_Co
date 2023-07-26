const { Router } = require('express');
const router = Router();

const { postCartsHandler } = require('../Handlers/post/postCartsHandler');

router.post('/', postCartsHandler)

module.exports = router;