const mongoose = require('mongoose');

const cartCollection = 'carts';

const cartSchema =  new mongoose.Schema(
    {   
        status: {
            type: String,
            default: 'empty'
            },
        products: [
              {
                product: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'products'
                },
                quantity: {
                  type: Number,
                  default: 1
                }
              }
            ],
        total_amount: {
          type: Number,
          require: true
        },  
        owner:{
          type: String,
          require: true
      }
    }
);

cartSchema.pre('findOne', function (){
    this.populate('products.product');
});

const cartModel = mongoose.model(cartCollection, cartSchema);

module.exports = {
  cartModel
};