const {shippingCost} = require('../../models/shippingCost.model.js') 

const postShippingPriceController = async (price) =>{
   return await shippingCost.create({price});
}

module.exports = {
    postShippingPriceController
}