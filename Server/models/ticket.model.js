const mongoose = require('mongoose');

const ticketsCollection = 'tickets';

const ticketsSchema = new mongoose.Schema(
    { 
        preferenceId:{
          type: String,
          default: "none"
        }, 
        total_amount:  {
          type: String,
          required: true
        },
        paymentMethod: {
          type: String,
          required: true
        },
        comprobanteMercadoPago: {
          type: String,
          default: ''
        },
        shippingOption: {
          type: String,
          required: true
        },
        products:  {
          type: Array,
          required: true
      },
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
        notes: String,
        fecha:  {
          type: String,
          required: true
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