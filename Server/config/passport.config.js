const passport  = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
require('dotenv').config();

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