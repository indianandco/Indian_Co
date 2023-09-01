const mongoose = require('mongoose');

const ticketsCollection = 'tickets';

const ticketsSchema = new mongoose.Schema(
    {
        total_amount: String,
        products: [],
        owner:{
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


const ticketModel = mongoose.model(ticketsCollection, ticketsSchema);

module.exports = {
  ticketModel
};