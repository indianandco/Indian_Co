const { Router } = require('express');
const { postUsersHandler } = require('../Handlers/post/postUsersHandler');
const router = Router();

router.post('/', postUsersHandler)

module.exports = router;