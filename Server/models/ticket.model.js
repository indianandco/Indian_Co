const mongoose = require('mongoose');

const ticketsCollection = 'tickets';

const ticketsSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            require: true,
          },
        purchaser: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'users'
          },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'carts'  
            }
        ]
    },
    {
        timestamps: {
            createdAt: "purchase_datetime",
          },
        versionKey: false
    }
);

ticketsSchema.pre('find', function (){
  this.populate('purchaser');
  this.populate('carts', 'products')
});

const ticketModel = mongoose.model(ticketsCollection, ticketsSchema);

module.exports = {
  ticketModel
};