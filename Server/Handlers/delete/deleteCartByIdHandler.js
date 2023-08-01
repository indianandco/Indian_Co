const { deleteCartByIdController } = require ('../../Controllers/delete/deleteCartByIdController')

const deleteCartByIdHandler = async (req,res)=>{
try {
    const {id } = req.params
    const deleteCart = await deleteCartByIdController(id)
    res.status(200).json({result:'success', payload: deleteCart})
} catch (error) {
    res.status(400).json({error:error.message})
}
}

module.exports={
    deleteCartByIdHandler
}