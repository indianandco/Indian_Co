const { deleteProductByIdController } = require ('../../Controllers/delete/deleteProductByIdController')

const deleteProductByIdHandler= async (req, res) =>{
try {
    const { id }= req.params
    const deleteProduct = await deleteProductByIdController(id)
return res.status(200).json({ result: 'success', payload:deleteProduct})
} catch (error) {
    res.status(400).json({error:error.message})    
}

}


module.exports={
    deleteProductByIdHandler
}