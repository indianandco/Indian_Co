const { cartModel } = require('../../models/cart.model');

const getCartByIdController = async(cid) =>{
    return await cartModel.findOne({_id: cid});
};

module.exports = {
    getCartByIdController
};