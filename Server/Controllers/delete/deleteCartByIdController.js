const { cartModel } = require ('../../models/cart.model')

const deleteCartByIdController = async (id)=>{
try {
    const deleteCart = await cartModel.deleteOne({_id:id})
    //console.log(deleteCart.deletedCount) 
    if(deleteCart.deletedCount === 0){
        throw new Error("No se pudo encontrar el carrito en la BDD");
    }
    return deleteCart
} catch (error) {
   throw error
}
}

module.exports={
    deleteCartByIdController
}