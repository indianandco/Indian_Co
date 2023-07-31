const {productModel} = require('../../models/product.model');

const postProductsController = async ({title, price, description, stock, category, offer_boolean,size,fragance,image} ) =>{
        return await productModel.create( {title, price, description, stock, category, offer_boolean,size,fragance,image} );
       
};

module.exports = {
        postProductsController
};