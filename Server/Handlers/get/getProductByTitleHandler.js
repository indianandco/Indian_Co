const { getProductByTitleController } = require('../../Controllers/get/getProductByTitleController')

const getProductByTitleHandler = async (req,res)=>{

const { title } = req.query
 try {
    const findIt = await getProductByTitleController(title)
    if(!findIt.length){
        throw new Error("No se encontro ese titulo")
    }
    return res.status(200).json(findIt)
} catch (error) {
    res.status(400).json({error:error.message})
    }
}

module.exports={
    getProductByTitleHandler}