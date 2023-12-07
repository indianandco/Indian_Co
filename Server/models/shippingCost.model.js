const mongoose = require('mongoose');

const shippingCostCollection = 'shippingCost';

const shippingCostSchema =  new mongoose.Schema(
    {   
        price:  Number,
        
    }
);


const shippingCost = mongoose.model(shippingCostCollection, shippingCostSchema);

module.exports = {
    shippingCost
};