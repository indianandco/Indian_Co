const { userModel }= require('../../models/user.model')

const getAllUserController= async ()=>{
    try {
        const findAll = await userModel.find()
        return findAll
    } catch (error) {
        return ({error: "No se pude acceder a la BDD"})
        
    }
}
module.exports={
    getAllUserController
}