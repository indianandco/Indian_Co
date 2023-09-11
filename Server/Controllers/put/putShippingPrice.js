const { shippingCost } = require('../../models/shippingCost.model');

const putShippingPriceController = async (newPrice) =>{
    const id = "64ff2eeebaa0ca32ee71174c";
    return await shippingCost.findOneAndUpdate({_id: id},{price: newPrice});
};


module.exports = {
    putShippingPriceController
}