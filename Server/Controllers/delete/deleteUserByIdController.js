const { userModel } = require('../../models/user.model')


const deleteUserByIdController = async (id) =>{
    try {
        const deleteUser= await userModel.deleteOne({_id:id});

        if(deleteUser){
            return deleteUser
            
        } else {
            throw new Error("No se pudo encontrar el usuario en la BDD");
        };
    } catch (error) {
        throw error
    };
}

module.exports={
    deleteUserByIdController
}