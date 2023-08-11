const { productModel } = require ('../../models/product.model')

const deleteProductByIdController= async(id)=>{
try {
    const deleteProduct = await productModel.deleteOne({ _id: id })
    if(deleteProduct){
        return deleteProduct
    } else {
        
        throw new Error("No se pudo encontrar el producto en la BDD");
    }
} catch (error) {
    throw error;
}
  
}

module.exports={
    deleteProductByIdController
}