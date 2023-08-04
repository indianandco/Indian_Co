const { cartModel } = require('../../models/cart.model');

const emptyCartController = async (cid) =>{
    return await cartModel.updateOne({ _id: cid }, { products: [] });

};

module.exports = {
    emptyCartController
}