const { cartModel } = require ('../../models/cart.model')

const deleteCartByIdController = async (id)=>{
try {
    const deleteCart = cartModel.deleteOne({_id:id})
    if(deleteCart.deletedCount === 0){
        throw new Error
    }
    return deleteCart
} catch (error) {
    return("Este es el error: ", error)
}
}

module.exports={
    deleteCartByIdController
}