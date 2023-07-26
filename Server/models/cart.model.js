const mongoose = require('mongoose');
const cartCollection = 'carts';

const cartSchema =  new mongoose.Schema(
    {   
        state: {
            type: String,
            default: 'empty'
            },
        products: {
            type: [
              {
                pId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "products",
                },
                quantity: {
                  type: Number,
                  default: 1,
                },
              },
            ],
            default: []
          },
        total_price: Number,
        owner: {
            type: mongoose.Schema.Types.String,
            ref: 'users'
        }
    }
);

cartSchema.pre('findOne', function (){
    this.populate('products.pId')
});

cartSchema.pre('findOne', function (){
    this.populate('users')
});


const cartModel = mongoose.model(cartCollection, cartSchema);

module.exports = {
  cartModel
};