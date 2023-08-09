const mongoose = require('mongoose');

const ticketsCollection = 'tickets';

const ticketsSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            require: true,
          },
      
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'  
            }
        ],
        purchaser:{
            type: String,
            require: true,
         
        },
        status:{
          type: Boolean,
          default: false
        }
    },
    {
        timestamps: {
            createdAt: "purchase_datetime",
          },
        versionKey: false
    }
);

ticketsSchema.pre('find', function (){
  this.populate('products.product')
})

const ticketModel = mongoose.model(ticketsCollection, ticketsSchema);

module.exports = {
  ticketModel
};