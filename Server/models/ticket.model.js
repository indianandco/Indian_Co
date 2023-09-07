const mongoose = require('mongoose');

const ticketsCollection = 'tickets';

const ticketsSchema = new mongoose.Schema(
    { 
        preferenceId: String,
        total_amount: String,
        paymentMethod: String,
        shippingOption: String,
        products: Array,
        owner:{
            type: String,
            require: true,
         
        },
        phone: String,
        email: String,
        address: String,
        city: String,
        province: String,
        zipcode: String,
        status:{
          type: Boolean,
          default: false
        },
        notes: String
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