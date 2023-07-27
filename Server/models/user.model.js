const mongoose = require('mongoose');

const userCollection = 'users';

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        birthdate: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        },
        city: {
            type: String,
        },
        FirebaseId: String,
        image: {
            type: String
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
        },
        role: {
            type: String,
            default: "user"
        },
        reviews: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },
            review: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'reviews'
            }
        }],
        cart: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'carts',
            default: []
        }],
        tickets: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tickets',
            default: []
        }],
        lastConnection: {
            type: Date,
            default: Date.now
        }
    }
);

userSchema.pre('find', function () {
    this.populate('reviews.product');
    this.populate('reviews.review');
    this.populate('cart');
    this.populate('tickets');
  });
  
const userModel = mongoose.model(userCollection, userSchema);

module.exports = {
    userModel
};