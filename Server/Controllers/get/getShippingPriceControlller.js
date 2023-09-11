const { shippingCost } = require('../../models/shippingCost.model');

const getShippingPriceControlller = async () =>{
    const id = "64ff2eeebaa0ca32ee71174c";
    return await shippingCost.findById({_id: id})
}

module.exports = {
    getShippingPriceControlller
}