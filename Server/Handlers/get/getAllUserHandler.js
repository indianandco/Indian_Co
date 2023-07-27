const {getAllUserController} = require('../../Controllers/get/getAllUserController')

const getAllUserHandler= async(req,res)=>{
try {
    const findAll = await getAllUserController()
    console.log(findAll)
    return res.status(200).json(findAll)
} catch (error) {
    res.status(400).json({error: error.message})
}
}

module.exports={
    getAllUserHandler
}