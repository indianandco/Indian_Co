const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ticketsCollection = 'tickets';

const ticketsSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            require: true,
          },
        purchaser: {
            type: mongoose.Schema.Types.String,
            require: true,
            ref: 'users'
          },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'  
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

ticketsSchema.plugin(mongoosePaginate);

ticketsSchema.pre('find', function (){
  this.populate('purchaser', 'email');
});

ticketsSchema.pre('find', function (){
    this.populate('products');
});

const ticketModel = mongoose.model(ticketsCollection, ticketsSchema);

module.exports = {
  ticketModel
};