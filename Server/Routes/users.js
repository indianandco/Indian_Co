const { Router } = require('express');
const passport = require('passport');
const router = Router();

const { postUsersHandler } = require('../Handlers/post/postUsersHandler');
const { failRegister } = require('../Handlers/get/failRegister');
const { loginHandler } = require('../Handlers/post/loginHandler');
const { failLogin } = require('../Handlers/get/failLogin');
const { logOut } = require('../Handlers/get/logOut');
const { callBackAuthenticate } = require('../Handlers/get/callBackAuthenticate');

//Registro:
router.post('/register', passport.authenticate('register', {failureRedirect: 'fail-register'}), postUsersHandler);
router.get('/fail-register', failRegister);
//Login:
router.post('/login', passport.authenticate('login', {failureRedirect: 'fail-login'}), loginHandler);
router.get('/fail-login', failLogin );

//Login/register con Google:
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }), loginHandler);
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), callBackAuthenticate);

//Logout:
router.get('/logout', logOut);


module.exports = router;