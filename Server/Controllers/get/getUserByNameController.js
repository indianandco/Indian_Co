const {userModel} = require('../../models/user.model');

const getUserByNameController = async(first_name)=>{
    try {
        const userFound = await userModel.find({
            first_name: { $regex: new RegExp(first_name, 'i') }
        });
        return userFound;
    } catch (error) {
        return ({error: "No se encontro ese Usuario en la BDD"})
    };
};

module.exports={
    getUserByNameController
}