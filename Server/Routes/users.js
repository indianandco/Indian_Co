const { Router } = require('express');
const passport = require('passport')
const router = Router();

const { postUsersHandler } = require('../Handlers/post/postUsersHandler');
const { failRegister } = require('../Handlers/get/failRegister');
const { loginHandler } = require('../Handlers/post/loginHandler');
const { failLogin } = require('../Handlers/get/failLogin');
const { logOut } = require('../Handlers/get/logOut');


const { getUserByNameHandler } = require ('../Handlers/get/getUserByNameHandler')
const { getAllUserHandler } = require ('../Handlers/get/getAllUserHandler')

const { deleteUserByIdHandler } = require ('../Handlers/delete/deleteUserByIdHandler')

//Registro:
router.post('/register', passport.authenticate('register', {failureRedirect: 'fail-register'}), postUsersHandler);
router.get('/fail-register', failRegister);
//Login:
router.post('/login', passport.authenticate('login', {failureRedirect: 'fail-login'}), loginHandler);
router.get('/fail-login', failLogin );
//Logout:
router.get('/logout', logOut);


router.get('/', getAllUserHandler)
router.get('/search', getUserByNameHandler)

router.delete('/delete/:id', deleteUserByIdHandler)

module.exports = router;