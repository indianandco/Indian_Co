const productModel = require('../../models/product.model');

const postProductsController = async ({title, price, description, stock, category} ) =>{
        return await productModel.create( {title, price, description, stock, category} );
};

module.exports = {postProductsController};