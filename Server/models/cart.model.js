const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

cartSchema.plugin(mongoosePaginate);

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