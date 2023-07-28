const { productModel } = require('../../models/product.model');

const putProductController = async (id, updateProduct) =>{

    return await productModel.updateOne({_id: id}, updateProduct);

};

module.exports = {
    putProductController
}