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
                ref: 'carts'  
            }
        ],
        purchaser:{
            type: String,
            require: true,
         
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
  this.populate({
    path: 'products',
    populate: {
      path: 'product',
      model: 'products'
    }
  })})

const ticketModel = mongoose.model(ticketsCollection, ticketsSchema);

module.exports = {
  ticketModel
};