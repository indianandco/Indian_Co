const {productModel} = require ('../../models/product.model');

const getProductByIdController= async (id)=>{
    try {
        const product= await productModel.findById(id);
        if(!product){
            throw new Error;
        }
        return product;
    } catch (error) {
        return ({ error: "No se pudo encontrar el producto en la BDD"});
    };
};

module.exports={
    getProductByIdController
};