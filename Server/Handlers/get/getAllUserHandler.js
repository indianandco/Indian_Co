const {getAllUserController} = require('../../Controllers/get/getAllUserController')

const getAllUserHandler= async(req,res)=>{
try {
    const findAll = await getAllUserController()
    if(!findAll.length){
            throw new Error ("Error en el controller")
        }
  
    return res.status(200).json(findAll)
} catch (error) {
        console.log(error)
    res.status(400).json({error: error.message})
}
}

module.exports={
    getAllUserHandler
}