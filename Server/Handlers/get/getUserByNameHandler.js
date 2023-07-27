const { getUserByNameController } = require('../../Controllers/get/getUserByNameController')

const getUserByNameHandler = async (req,res)=>{
const {first_name} = req.query


try {
    const nameFound = await getUserByNameController(first_name)
 
    if(!nameFound.length){
        throw new Error ("No se encontro un usuario con ese nombre")
    }
    return res.status(200).json(nameFound)
} catch (error) {
    res.status(400).json({error: error.message})
}
}

module.exports={
    getUserByNameHandler
}