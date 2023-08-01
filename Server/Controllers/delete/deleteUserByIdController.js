const { userModel } = require('../../models/user.model')


const deleteUserByIdController = async (id) =>{
try {
    const deleteUser= await userModel.deleteOne({_id:id})
console.log(deleteUser.deletedCount)
    if(deleteUser.deletedCount === 0){
        
        throw new Error("No se pudo encontrar el usuario en la BDD");
    }
    return deleteUser
} catch (error) {
   throw error
}
}

module.exports={
    deleteUserByIdController
}