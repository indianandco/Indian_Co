const passport  = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const { createHash, isValidPassword } = require('./bcrypt.config');

//Modelos Bd:
const { userModel } = require('../models/user.model');
const { cartModel } = require('../models/cart.model');



const initializePassport = () =>{

//Registro de usuario:
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done)=>{       

        try {
            const { first_name, last_name, gender, birthdate, address, zipcode, city, phone, age, email } = req.body;
            //Falta validar los datos  
            const user = await userModel.findOne({ email: username });

            if(user) {
                console.log('El usuario ya existe');
                return done(null, false)
            };

            const newUser = {
                first_name, 
                last_name,
                email,
                gender,
                birthdate,
                address,
                zipcode,
                city,
                phone,
                age,
                password: createHash(password)
            };

            const result = await userModel.create( newUser );

            console.log(`El usuario con el mail: ${user.email} se registro de manera tradicional`);

            return done(null, result);

        } catch (error) {
            return done(`Error al registrar usuario, ${error}`);
        };
    }));

//Login:
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) =>{
        try {
            const user = await userModel.findOne({ email: username });

            if (!user) {
                return done(null, false);
            };

            if(!isValidPassword(user, password)) {
                
                return done(null, false)
            };

            if (user.carts.length === 0) {
                let newCart = await cartModel.create();
                let userId = user._id.toString();

                await userModel.findByIdAndUpdate(userId, { $push: { carts: { _id: newCart._id } } });
            };

            console.log(`El usuario con el mail: ${user.email} inicio session de forma 'local`);
        
            return done(null, user);
            
        } catch (error) {
            console.log(`${error}`);
            return done(`Error al loguear usuario, ${error}`);
        }
    }));
    
//Login con Facebook:
    passport.use('facebook', new FacebookStrategy({
        //Necesitamos el acceso al id y secreto de fb.
        //Acceder como variables de entorno

        clientID: '699066058726054', 
        clientSecret: '60bbf1124c11fab806f737772b4b25d7',
        callbackURL: "http://localhost:3001/users/auth/facebook/callback", //Cambiar la Url
        profileFields: ['first_name', 'last_name', 'email', 'birthday', 'gender', 'hometown']
    },
    async function(accessToken, refreshToken, profile, done) {
        try {
            //Revisar la informacionque trae el profile
            console.log(profile);
            const user = await userModel.findOne({ email: profile.email });
            // userModel.findOne({ email: profile.email }, function (err, user) {
            // return cb(err, user);
            // });
            if(!user) {
                const newUser = {
                    //rellenar con los datos, que envie el profile
                    first_name: profile._json.first_name, 
                    last_name: profile._json.last_name,
                    email,
                    gender,
                    birthdate,
                    address,
                    zipcode,
                    city,
                    phone,
                    age,
                    password: ''
                };
                const result = await userModel.create( newUser );
                
                console.log(`El usuario con el mail: ${user.email} se registro con 'facebook`);

                return done(null, result);
            } else {
                console.log(`El usuario con el mail: ${user.email} inicio session de forma 'local`);
                return done(null, user);
            };
        } catch (error) {
            console.log(`${error}`);
            return done(error)
        };
    }));

//Login con Google:
    // passport.use('google', new GoogleStrategy({
    // //Necesitamos el acceso al id y secreto de fb.
    // //Acceder como variables de entorno

    //     clientID: GOOGLE_CLIENT_ID,
    //     clientSecret: GOOGLE_CLIENT_SECRET,
    //     callbackURL: "http://www.example.com/auth/google/callback" //Cambiar la Url
    // },
    // async function(accessToken, refreshToken, profile, done) {
    //     try {
    //         //Revisar la informacionque trae el profile
    //         console.log(profile);
    //         const user = await userModel.findOne({ email: profile.email });
    //         // userModel.findOne({ email: profile.email }, function (err, user) {
    //         // return cb(err, user);
    //         // });
    //         if(!user) {
    //             const newUser = {
    //                 //rellenar con los datos, que envie el profile
    //                 first_name, 
    //                 last_name,
    //                 email,
    //                 gender,
    //                 birthdate,
    //                 address,
    //                 zipcode,
    //                 city,
    //                 phone,
    //                 age,
    //                 password: ''
    //             };
    //             const result = await userModel.create( newUser );
    
    //             console.log(`El usuario con el mail: ${user.email} se registro con 'google`);
    
    //             return done(null, result);
    //         } else {
    //             console.log(`El usuario con el mail: ${user.email} inicio session con 'google`);
    //             done(null, user);
    //         };
    //     } catch (error) {
    //         console.log(`${error}`);
    //         return done(error)
    //     };
    // }));

    passport.serializeUser((user, done) =>{
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done)=>{
        const user = await userModel.findById(id);
        done(null,user);
    })
};

module.exports = { 
    initializePassport
};