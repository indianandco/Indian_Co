const { cartModel } = require('../../models/cart.model');

const putCartController = async (cid, updateCart) =>{

    return await cartModel.findByIdAndUpdate({_id: cid}, updateCart);
    
};

module.exports = {
    putCartController
}