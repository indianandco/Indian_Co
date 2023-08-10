const { userModel } = require('../../models/user.model');

//Funcion para agregar un carrito al array carts de un usuario.
//Puede quedar para cuando el usuario haga la compra. 
//Si debe registrarse se pushee en su 'perfil'


const putCreateCartUser = async (userId, newCart) =>{
    return await userModel.findByIdAndUpdate(userId, { $push: { carts: { _id: newCart._id } } });
};

module.exports = {
    putCreateCartUser
}