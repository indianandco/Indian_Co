const { cartModel } = require('../../models/cart.model');

const postCartsController = async ({total_amount, owner, products} ) =>{
        return await cartModel.create( {total_amount, owner, products} );
};

module.exports = {
    postCartsController
};