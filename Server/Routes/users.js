const { Router } = require('express');
const router = Router();

const { postUsersHandler } = require('../Handlers/post/postUsersHandler');
const { getUserByNameHandler } = require ('../Handlers/get/getUserByNameHandler')
const { getAllUserHandler } = require ('../Handlers/get/getAllUserHandler')
 
router.get('/', getAllUserHandler)
router.get('/search', getUserByNameHandler)

router.post('/', postUsersHandler)

module.exports = router;