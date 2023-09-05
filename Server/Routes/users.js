const { Router } = require('express');
const passport = require('passport');
const router = Router();

const { failRegister } = require('../Handlers/get/failRegister');
const { loginHandler } = require('../Handlers/post/loginHandler');
const { failLogin } = require('../Handlers/get/failLogin');
const { logOut } = require('../Handlers/get/logOut');
const { callBackAuthenticate } = require('../Handlers/get/callBackAuthenticate');
const { putUserHandler } = require('../Handlers/put/putUserHandler');


//Registro:
router.post('/register', passport.authenticate('register', {failureRedirect: 'fail-register'}));
router.get('/fail-register', failRegister);
//Login:
router.post('/login', passport.authenticate('login', {failureFlash: true}), loginHandler);
router.get('/fail-login', failLogin );

//Login/register con Google:
router.get('/auth/google', passport.authenticate('google', { scope: ["https://www.googleapis.com/auth/userinfo.profile","https://www.googleapis.com/auth/userinfo.email"], successRedirect:"http://localhost:5173" }), loginHandler);
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: "http://localhost:5173/12312315645465" }), callBackAuthenticate);

//Logout:
router.get('/logout', logOut);

//perfil del usuario:
router.post('/edit', putUserHandler)

module.exports = router;