const { productModel } = require ('../../models/product.model')

const deleteProductByIdController= async(id)=>{
    
try {
    const deleteProduct = await productModel.deleteOne({ _id: id })
    console.log(deleteProduct)
    if(deleteProduct.deletedCount === 0){
        throw new Error("No se pudo encontrar el producto en la BDD");
    }
    return deleteProduct
} catch (error) {
    throw error;
}
  
}

module.exports={
    deleteProductByIdController
}