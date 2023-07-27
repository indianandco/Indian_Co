const { getProductByCategoryController }= require('../../Controllers/get/getProductByCategoryController')

const getProductByCategoryHandler = async (req,res)=>{
    const { category } = req.params 
try {
    const productByCategory = await getProductByCategoryController(category)
    if(!productByCategory.length){
        throw new Error("No se encontro esa categoria")
    }
    return res.status(200).json(productByCategory)
} catch (error) {
    res.status(400).json({error:error.message})
}
}

module.exports={
    getProductByCategoryHandler
}