const passport  = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, CALLBACK_URL} = process.env;

const { createHash, isValidPassword } = require('./bcrypt.config');

//llamados a la Bd:
const { userModel } = require('../models/user.model');

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

            console.log(newUser)

            const result = await userModel.create( newUser );

            console.log("result ",result)

            console.log(`El usuario con el mail: ${result.email} se registro de manera tradicional`);

            return done(null, result);

        } catch (error) {
            return done(`Error al registrar usuario, ${error}`);
        };
    }));

//Login:
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
    }, async (username, password, done) =>{
        try {
            const user = await userModel.findOne({ email: username });
            
            if (!user) {
                return done(null, false);
            };

            if(!isValidPassword(user, password)) {
               return done(null, false)
            };

            //Para calcular la ultima conexion, siempre que el usuario el se loguee, se actualiza el campo:
            user.lastConnection = new Date();
            await userModel.findByIdAndUpdate(user._id, { lastConnection: user.lastConnection });

            console.log(`El usuario con el mail: ${user.email} inicio session de forma 'local`);
        
            return done(null, user);
            
        } catch (error) {
            return done({message: `Error al loguear usuario`});
        }
    }));


//LOGIN CON GOOGLE:
         passport.use('google', new GoogleStrategy({
            clientID:GOOGLE_CLIENT_ID,
            clientSecret:GOOGLE_CLIENT_SECRET,
            callbackURL:CALLBACK_URL  
         },
         async function(accessToken, refreshToken, profile, cb) {
             try {
                console.log(CALLBACK_URL);
                 const user = await userModel.findOne({ email: profile.emails[0].value });
                  
                 if(!user) {
                     const newUser = {
                         first_name:profile.name.givenName, 
                         last_name:profile.name.familyName,
                         email:profile.emails[0].value,
                     
                    };
                    const result = await userModel.create( newUser );
        
                    console.log(`El usuario con el mail: ${newUser.email} se registro con 'google`);
        
                     return cb(null, result);
                 } else {

                    console.log(`El usuario con el mail: ${user.email} inicio session con 'google`);
                    return cb(null, user);
                 };
            } catch (error) {
             console.log(`${error}`);
             return cb(error)
         };
     }));

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