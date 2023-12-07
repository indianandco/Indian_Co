const { deleteProductByIdController } = require ('../../Controllers/delete/deleteProductByIdController')

const deleteProductByIdHandler= async (req, res) =>{
try {
    let id = req.params.pid;
    const deleteProduct = await deleteProductByIdController(id)
return res.status(200).json({ result: 'success', payload:deleteProduct})
} catch (error) {
    res.status(400).json({error:error.message})    
}

}


module.exports={
    deleteProductByIdHandler
}