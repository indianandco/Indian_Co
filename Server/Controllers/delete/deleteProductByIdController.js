const { productModel } = require ('../../models/product.model')

const deleteProductByIdController= async(id)=>{
try {
    const deleteProduct = await productModel.deleteOne({ _id: id })
    if(deleteProduct.deletedCount === 0){
     throw error
    } else {
        return deleteProduct
        
    }
} catch (error) {
    throw new Error("No se pudo encontrar el producto en la BDD");
}
  
}

module.exports={
    deleteProductByIdController
}