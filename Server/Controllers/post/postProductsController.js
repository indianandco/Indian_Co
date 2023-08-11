const {productModel} = require('../../models/product.model');

const postProductsController = async ({title, price, description, stock, category, offer, size, fragance, image, offer_price} ) =>{
try {
        const productExist= await productModel.findOne({title:title})
        if(productExist){
                throw new Error(`Ya existe un producto con ese titulo ${title}`)
        }
        return await productModel.create( {title, price, description, stock, category, offer, offer_price,size,fragance,image} );
} catch (error) {
        throw new Error('Error al subir el producto')
}
       
};

module.exports = {
        postProductsController
};