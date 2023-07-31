const {userModel} = require('../../models/user.model');

const getUserByEmailController = async(email)=>{
    try {
        const userFound = await userModel.findOne({ email: email })
        return userFound;
    } catch (error) {
        return ({error: "No se encontro ese Usuario en la BDD"})
    };
};

module.exports={
    getUserByEmailController
}