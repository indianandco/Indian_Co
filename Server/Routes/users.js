const { Router } = require('express');
const passport = require('passport');
const router = Router();

const { failRegister } = require('../Handlers/get/failRegister');
const { loginHandler } = require('../Handlers/post/loginHandler');
const { failLogin } = require('../Handlers/get/failLogin');
const { logOut } = require('../Handlers/get/logOut');
const { callBackAuthenticate } = require('../Handlers/get/callBackAuthenticate');
const { putUserHandler } = require('../Handlers/put/putUserHandler');
const { sendEmail } = require('../Controllers/post/postSendEmail')
//Contacto:
router.post('/contact', sendEmail)
//Registro:
router.post('/register', passport.authenticate('register', {failureRedirect: 'fail-register'}));
router.get('/fail-register', failRegister);
//Login:
router.post('/login', passport.authenticate('login', {failureFlash: true}), loginHandler);
router.get('/fail-login', failLogin );

//Login/register con Google:
router.get('/auth/google',passport.authenticate('google', { scope: ['profile'] }));
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

//Logout:
router.get('/logout', logOut);

//perfil del usuario:
router.post('/edit', putUserHandler)

module.exports = router;