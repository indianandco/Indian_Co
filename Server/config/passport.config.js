const passport  = require('passport');
const local  = require('passport-local');

const { createHash, isValidPassword } = require('./bcrypt.config');

//Modelos Bd:
const { userModel } = require('../models/user.model');
//const { cartModel } = require('../models/cart.model');


const LocalStrategy = local.Strategy;

const initializePassport = () =>{

//Registro de usuario:
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done)=>{       

        try {
            const { first_name, last_name, gender, birthdate, address, zipcode, city, phone, age, email } = req.body;
            console.log(req.body.email)
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

            // if (user.carts.length === 0) {
            //     let newCart = await createCart();
            //     let userId = user._id.toString();

            //     await createCartUser(userId, newCart);
            // }

            console.log(`El usuario con el mail: ${user.email} inicio session`);
            
            return done(null, user);
            
        } catch (error) {
            console.log(`${error}`);
            return done(`Error al loguear usuario, ${error}`);
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
}