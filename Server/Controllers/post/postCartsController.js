const { cartModel } = require('../../models/cart.model');

const postCartsController = async ({total_price, owner} ) =>{
        return await cartModel.create( {total_price, owner} );
};

module.exports = {
    postCartsController
};